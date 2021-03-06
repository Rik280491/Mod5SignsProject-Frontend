import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import VoiceOverOffIcon from "@material-ui/icons/VoiceOverOff";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import SearchModal from "./SearchModal";
import MissingWordDialog from "./MissingWordDialog";
import API from "../API/API";
import DropdownSearch from "./DropdownSearch";
import InfoIcon from '@material-ui/icons/Info';



const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
	// voiceButton: {
	// 	margin: theme.spacing(1)
	// }
}));

const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

function SearchSigns(props) {
	const classes = useStyles();
	const { searchSigns, signs } = props;
	const [searchModal, setSearchModal] = useState(false);
	const [listening, setListening] = useState(false);
	const [suggestedWord, setSuggestedWord] = useState("");
	const [definition, setDefinition] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const regCapConverter = (value) => {
		// only allows alphanumeric characters, capitilises first letter and no whitespaces
		if (value) {
			return (
				value.charAt(0).toUpperCase() +
				value
					.slice(1)
					.replace(/[^\w\s]|_/g, "")
					.replace(/\s+/g, " ")
					.trim()
			);
		} else {
			return
		}
		
	};

	const isDefined = (searchValue) => {
		console.log("here");
		if (searchValue.length > 1) {
			API.checkWord(searchValue)
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						// alert("This Word is not in the English Dictionary!")
						// stops phrases from being recognised. Find phrases dictionary?
						throw Error;

					}
				})
				.then((definitionsData) => {
					setDefinition(definitionsData);
					setSuggestedWord(searchValue);
				});
		} else {
			
			throw Error;
			
		}
	};

	const onChange = (e) => {
		console.log(e.target.innerText);
		Number.isInteger(e.target.value)
			? setSearchValue(regCapConverter(e.target.innerText))
			: setSearchValue(regCapConverter(e.target.value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("clicked");
		searchSigns(searchValue);

		if (signs.filter((sign) => sign.name === searchValue).length > 0) {
			setSearchModal(true);
		} else {
			console.log("reached");
			isDefined(searchValue);
		}
	};

	const handleSpeech = () => {
		console.log("clicked");
		setListening(true);
		recognition.start();
	};

	recognition.onresult = (e) => {
		handleValue(e.results[0][0].transcript);
	};

	const handleValue = (speechValue) => {
		
		const voiceSearchValue = regCapConverter(speechValue);
		searchSigns(voiceSearchValue);
		if (signs.filter((sign) => sign.name === voiceSearchValue).length > 0) {
			setSearchModal(true);
		} else {
			isDefined(voiceSearchValue);
		}

		recognition.stop();
		setListening(false);
	};

	const override = () => {
		recognition.stop()
		setListening(false)
	}

	
	return (
		<div className={classes.margin}>
			<Grid container spacing={4} alignItems="center"  >
				<Grid item style={{ height: 55 }}>
				
				{/* if word is not in db, shows info dialog */}
				{suggestedWord ? (
				
					<MissingWordDialog
						setDefinition={setDefinition}
						definition={definition}
						suggestedWord={suggestedWord}
						setSuggestedWord={setSuggestedWord}
					/>
					
				) : <InfoIcon color="disabled"/>}
				</Grid>
				<Grid item  >
					<form onSubmit={handleSubmit}>
						<DropdownSearch onChange={onChange}  />
					</form>
					{/* if word is in db, shows video in modal */}
					{searchModal ? <SearchModal /> : null}
				</Grid>
				<Grid item style={{ height: 55 }}>
					{!listening ? (
						<VoiceOverOffIcon
							className={classes.voiceButton}
							onClick={handleSpeech}
						/>
					) : (
						<RecordVoiceOverIcon className={classes.voiceButton} onClick={override}/>
					)}
				</Grid>
				
			</Grid>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		searchedSigns: state.searchedSigns,
		signs: state.signs,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchSigns: (searchValue) =>
			dispatch({ type: "SEARCH_SIGNS", payload: { searchValue } }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchSigns);
