//implement video.js after func reached
import React, { useState } from "react";
import SearchModal from "../search/SearchModal";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
}));

function SignCard({ name, videoURL, searchSigns }) {
	console.log(videoURL);
	const [modalLoad, setModalLoad] = useState(false);
	// const [userVideos, setUserVideos] = useState([])
	const classes = useStyles();

	const toggleLoad = (name) => {
		console.log("clicked");
		searchSigns(name);
		setModalLoad(true);
	};
	return (
		<Card className={classes.root}>
			{/* TWO OR MORE VIDEOS? */}
			{/* <video width="300" height="240" controls>
				<source src={videoURL} type="video/mp4" />
			</video> */}

			<CardMedia
				component="iframe"
				// alt="Contemplative Reptile"
				height="140"
				src={videoURL}
				title={name}
			/>
			<button onClick={() => toggleLoad(name)}> {name} </button>
			{modalLoad ? <SearchModal /> : null}
		</Card>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		searchSigns: (searchValue) =>
			dispatch({ type: "SEARCH_SIGNS", payload: { searchValue } }),
	};
};

export default connect(null, mapDispatchToProps)(SignCard);
