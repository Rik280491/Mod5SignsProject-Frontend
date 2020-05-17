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
	const { searchSigns } = props;
	const [searchModal, setSearchModal] = useState(false);
	const [listening, setListening] = useState(false);
	const [voiceSearchModal, setVoiceSearchModal] = useState(false);
    const [speechPlaceholder, setSpeechPlaceholder] = useState("");
    

	const onChange = (e) => {
		searchSigns(e.target.value);
		setSearchModal(true);
	};

	const handleSpeech = () => {
        console.log("clicked");
        setListening(true)
		recognition.start();
	};

	recognition.onresult = (e) => {
		handleValue(e.results[0][0].transcript);
        setSpeechPlaceholder(e.results[0][0].transcript);

	};

	const handleValue = (searchValue) => {
		const capSearchValue =
        searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
        const regCapSearchValue = capSearchValue.replace(/[^\w\s]|_/g, "")
		.replace(/\s+/g, " ");
		searchSigns(regCapSearchValue);
		setVoiceSearchModal(true);
        recognition.stop();
        setListening(false)
        
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
					{ !listening ? <VoiceOverOffIcon onClick={handleSpeech} /> : <RecordVoiceOverIcon />}
				</Grid>
			</Grid>
		</div>
	);
}



const mapDispatchToProps = (dispatch) => {
	return {
		searchSigns: (searchValue) =>
			dispatch({ type: "SEARCH_SIGNS", payload: { searchValue } }),
	};
};

export default connect(null, mapDispatchToProps)(SearchSigns);
