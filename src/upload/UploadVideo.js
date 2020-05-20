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


// import { regCapConverter } from "../search/SearchSigns"

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}));

function UploadVideo({ username, signs, searchedSign, selectedSign, deselectSign }) {
	const [loading, setLoading] = useState(false);
	const [video, setVideo] = useState(null);
	const [signName, setSignName] = useState("");
	const [newSign, setNewSign] = useState(null);
	const [uploadResponse, setUploadResponse] = useState("")

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
		setSignName(e.target.value);
	};

	// already defined. import from search signs
	const regCapConverter = (value) => {
		return (
			value.charAt(0).toUpperCase() +
			value
				.slice(1)
				.replace(/[^\w\s]|_/g, "")
				.replace(/\s+/g, " ")
		);
	};

	const handleSignAndVideoPost = () => {
		const regCapSignName = regCapConverter(signName);

		if (video) {
			API.createSignWithVideo(
				{
					video_url: video,
					sign_name: regCapSignName,
				},
				localStorage.token
			).then(response => setUploadResponse(response))
			
			if (selectedSign) {
				API.createSignWithVideo(
					{
						video_url: video,
						sign_name: selectedSign.name,
					},
					localStorage.token
				).then(response => setUploadResponse(response))
				
					
			}
		} else {
			alert("A VIDEO FILE MUST BE ATTACHED");
			// write this in red text after the upload button? or as a dialog box?
		}
		deselectSign()
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
						<InputAutocomplete onChange={handleNameChange} />
					) : null}
					<input
						type="file"
						name="file"
						placeholder="Upload a Video"
						onChange={handleChange}
					/>

					{loading ? (
						<CircularProgress />
					) : (
						// better loading icon, progress bar?
						<>
							{/* <SignCard name={signName} videoArr={video} /> */}
							{/* view video youve just uploaded */}
							<CardMedia
								component="iframe"
								// doesn't full screen video
								height="140"
								src={video}
								
							/>

							<Button
								variant="contained"
								color="default"
								onClick={handleSignAndVideoPost}
								className={classes.button}
								startIcon={<CloudUploadIcon />}
							>
								Upload
							</Button>
							{ uploadResponse ? <h4>{uploadResponse.message}</h4> : null}
						</>
					)}
				</>
			)}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		username: state.username,
		signs: state.signs,
		selectedSign: state.selectedSign,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		deselectSign: () => dispatch({ type: "DESELECT_SIGN" })
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(UploadVideo);
