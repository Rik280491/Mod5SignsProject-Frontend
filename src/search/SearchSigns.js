import React, { useState } from "react";
import { connect } from "react-redux";
import SignCard from "../signs/SignCard";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import VoiceOverOffIcon from "@material-ui/icons/VoiceOverOff";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import SearchModal from "./SearchModal";
import MissingWordDialog from "./MissingWordDialog";
import API from "../API/API";
import Button from "@material-ui/core/Button";
import DropdownSearch from "./DropdownSearch"

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
	const { searchSigns, searchedSigns } = props;
	const [searchModal, setSearchModal] = useState(false);
	const [listening, setListening] = useState(false);
	const [voiceSearchModal, setVoiceSearchModal] = useState(false);
	const [speechPlaceholder, setSpeechPlaceholder] = useState("");
	const [suggestedWord, setSuggestedWord] = useState("");
	const [definition, setDefinition] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const regCapConverter = (value) => {
		return (
			value.charAt(0).toUpperCase() +
			value
				.slice(1)
				.replace(/[^\w\s]|_/g, "")
				.replace(/\s+/g, " ")
		);
	};

	
	const isDefined = (searchValue) => {
		
		if (searchValue.length > 1){
			API.checkWord(searchValue).then((response) => {
				if(response.ok) {
					return response.json()
				} else {
					throw Error
				}
			})
			.then(definitionsData => {
				setDefinition(definitionsData)
				setSuggestedWord(searchValue)
			})
		} else {
			throw Error
		}
		
	};

	const onChange = (e) => {
		console.log(e.target.value)
		setSearchValue(regCapConverter(e.target.value));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("clicked");
		searchSigns(searchValue)
		searchedSigns.length > 0 ? setSearchModal(true) : isDefined(searchValue)
	};

	const handleSpeech = () => {
		console.log("clicked");
		setListening(true);
		recognition.start();
	};

	recognition.onresult = (e) => {
		handleValue(e.results[0][0].transcript);
		setSpeechPlaceholder(e.results[0][0].transcript);
		console.log(e.results[0][0].transcript);
	};

	const handleValue = (speechValue) => {
		const voiceSearchValue = regCapConverter(speechValue);
		searchSigns(voiceSearchValue);
		searchedSigns.length > 0 ? setVoiceSearchModal(true) : isDefined(voiceSearchValue);

		
		recognition.stop();
		setListening(false);
	};

	return (
		<div className={classes.margin}>
			<Grid container spacing={3} alignItems="flex-end">
				<Grid item>
				<ImageSearchIcon />
				</Grid>
				<Grid item>
					<form onSubmit={handleSubmit}>
					<DropdownSearch onChange={onChange}
							
							 />
					</form>
					{searchModal || voiceSearchModal ? <SearchModal /> : null}
				</Grid>
				<Grid item>
					{!listening ? (
						<VoiceOverOffIcon className={classes.voiceButton}  onClick={handleSpeech}  />
					) : (
						<RecordVoiceOverIcon className={classes.voiceButton}/>
					)}
				</Grid>
				{suggestedWord ? (
					<MissingWordDialog
						setDefinition={setDefinition}
						definition={definition}
						suggestedWord={suggestedWord}
						setSuggestedWord={setSuggestedWord}
					/>
				) : null}
			</Grid>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		searchedSigns: state.searchedSigns,
		
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		searchSigns: (searchValue) =>
			dispatch({ type: "SEARCH_SIGNS", payload: { searchValue } }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchSigns);
