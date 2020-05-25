import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import SignCard from "../signs/SignCard";
import API from "../API/API";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAutocomplete from "./InputAutocomplete";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CardMedia from "@material-ui/core/CardMedia";
import LinearProgress from "@material-ui/core/LinearProgress";
import Input from "@material-ui/core/Input";

const toxicity = require("@tensorflow-models/toxicity");

// import { regCapConverter } from "../search/SearchSigns"

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}));

function UploadVideo(props) {
	const { username, selectedSign, deselectSign } = props;
	const [loading, setLoading] = useState(false);
	const [video, setVideo] = useState(null);
	const [signName, setSignName] = useState("");
	const [uploadResponse, setUploadResponse] = useState("");
	const [valid, setValid] = useState(false);
	const [warningMessage, setWarningMessage] = useState("");
	const [loadingValid, setLoadingValid] = useState(false);
	const [isWord, setIsWord] = useState(false);

	const classes = useStyles();

	console.log(selectedSign);

	const handleChange = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "SignVideos");
		setLoading(true);

		const response = await fetch(
			"https://api.cloudinary.com/v1_1/dm0musx2l/video/upload",
			{
				method: "POST",
				body: data,
			}
		);

		const file = await response.json();
		setVideo(file.secure_url);
		setLoading(false);
	};

	const handleNameChange = (e) => {
		setIsWord(false);
		setWarningMessage("");
		console.log(e.target.value);
		Number.isInteger(e.target.value)
			? setSignName(e.target.innerText)
			: setSignName(e.target.value);
	};

	const checkWord = (signName) => {
		const regWord = regCapConverter(signName);
		console.log(regWord);
		API.checkWord(regWord).then((response) => {
			if (!response.ok) {
				alert("This Word is not in the English Dictionary!");
				setIsWord(false);
				// future. consider a phrases api so phrases func can be added to app
			} else {
				setIsWord(true);
			}
		});
	};

	const checkToxicity = (signName) => {
		checkWord(signName);

		if (signName.length <= 1) {
			alert("Word must be more than one character long!");
			return;
		}

		checkWord(signName);

		if (isWord) {
			setLoadingValid(true);
			console.log(signName);
			// The minimum prediction confidence.
			const threshold = 0.8;

			// Which toxicity labels to return.
			const labelsToInclude = ["toxicity"];

			toxicity.load(threshold, labelsToInclude).then((model) => {
				// Now you can use the `model` object to label sentences.
				model.classify([signName]).then((predictions) => {
					if (predictions[0].results[0].match === true) {
						setWarningMessage("This is a family friendly app");
						setValid(false);
					} else {
						setValid(true);
						setWarningMessage("");
					}
					setLoadingValid(false);
				});
				// error handling
			});
		}
	};

	// already defined. import from search signs
	const regCapConverter = (value) => {
		return (
			value.charAt(0).toUpperCase() +
			value
				.slice(1)
				.replace(/[^\w\s]|_/g, "")
				.replace(/\s+/g, " ")
				.trim()
		);
	};

	const handleSignAndVideoPost = () => {
		const regCapSignName = regCapConverter(signName);
		console.log(regCapSignName);

		if (video) {
			API.createSignWithVideo(
				{
					video_url: video,
					sign_name: regCapSignName,
				},
				localStorage.token
			).then((response) => setUploadResponse(response));

			if (selectedSign) {
				API.createSignWithVideo(
					{
						video_url: video,
						sign_name: selectedSign.name,
					},
					localStorage.token
				).then((response) => setUploadResponse(response));

				setValid(false);
				deselectSign();
			}
		} else {
			alert("A VIDEO FILE MUST BE ATTACHED");
			//as a dialog box?
		}
	};

	return (
		<div>
			{!username ? (
				<h1>
					To upload a video please <Link to="/login"> log in </Link> or
					<Link to="/signup"> Sign Up </Link>{" "}
				</h1>
			) : (
				<>
					{selectedSign ? (
						<h1>Upload a Video for {selectedSign.name}</h1>
					) : (
						<h1>Upload a Video</h1>
					)}
					{!selectedSign ? (
						<>
							<InputAutocomplete onChange={handleNameChange} />

							<Button
								onClick={() => checkToxicity(signName)}
								variant="contained"
								color="secondary"
								size="small"
							>
								check validity
							</Button>
							{loadingValid ? (
								<LinearProgress color={"secondary"} />
							) : (
								<h2 style={{ color: "red" }}>{warningMessage}</h2>
							)}
						</>
					) : null}

					{/* when i move this down to line 229 the input stops functioning correctly */}
					{valid || selectedSign ? (
						<Input
							inputProps={{ accept: "video/*" }}
							type="file"
							name="file"
							placeholder="Upload a Video"
							onChange={handleChange}
						/>
					) : null}

					{loading ? (
						<CircularProgress />
					) : (
						// better loading icon, progress bar?
						<>
							{/* view video youve just uploaded */}
							<CardMedia
								component="iframe"
								// doesn't full screen video
								height="140"
								src={video}
							/>

							{valid || selectedSign ? (
								<>
									<Button
										variant="contained"
										color="default"
										onClick={handleSignAndVideoPost}
										className={classes.button}
										startIcon={<CloudUploadIcon />}
									>
										Upload
									</Button>
								</>
							) : null}
							{uploadResponse ? <h4>{uploadResponse.message}</h4> : null}
						</>
					)}
				</>
			)}
			{selectedSign ? (
				<Button onClick={() => deselectSign()} variant="outlined">
					reset form
				</Button>
			) : null}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		username: state.username,
		selectedSign: state.selectedSign,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deselectSign: () => dispatch({ type: "DESELECT_SIGN" }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideo);
