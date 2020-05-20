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

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
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

	const regCapConverter = (value) => {
		return (
			value.charAt(0).toUpperCase() +
			value
				.slice(1)
				.replace(/[^\w\s]|_/g, "")
				.replace(/\s+/g, " ")
		);
	};

	// const getDefinition = searchValue => {
	// 	return API.checkWord(searchValue).then(response => response.json()).then(data => setDefinition(data))
	// }

	// searchValue should not be equal to anything in the db
	const isDefined = (searchValue) => {
		API.checkWord(searchValue).then((response) => {
			response.json().then((data) => setDefinition(data));

			response.ok ? setSuggestedWord(searchValue) : setSuggestedWord("");
		});
	};

	
	const onChange = (e) => {
		const searchValue = regCapConverter(e.target.value);
		searchSigns(searchValue);
		setSearchModal(true);
		isDefined(searchValue);
	};

	const handleSpeech = () => {
		console.log("clicked");
		setListening(true);
		recognition.start();
	};

	recognition.onresult = (e) => {
		handleValue(e.results[0][0].transcript);
		setSpeechPlaceholder(e.results[0][0].transcript);
		console.log(e.results[0][0].transcript)
	};

	const handleValue = (searchValue) => {
		const voiceSearchValue = regCapConverter(searchValue);
		searchSigns(voiceSearchValue);
		setVoiceSearchModal(true);
		isDefined(voiceSearchValue);
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
					<TextField
						placeholder={speechPlaceholder}
						onChange={onChange}
						id="speechinput"
						x-webkit-speech
					/>
					{searchModal || voiceSearchModal ? <SearchModal /> : null}
				</Grid>
				<Grid item>
					{!listening ? (
						<VoiceOverOffIcon onClick={handleSpeech} />
					) : (
						<RecordVoiceOverIcon />
					)}
				</Grid>
				{suggestedWord ? (
					<MissingWordDialog
						setDefinition={setDefinition}
						definition={definition}
						suggestedWord={suggestedWord}
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

export default connect(null, mapDispatchToProps)(SearchSigns);
