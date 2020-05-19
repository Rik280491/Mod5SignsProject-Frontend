//implement video.js after func reached
import React, { useState } from "react";
import SearchModal from "../search/SearchModal";
import { connect } from 'react-redux'

function SignCard({ name, videoURL, searchSigns }) {
	console.log(videoURL);
	const [modalLoad, setModalLoad] = useState(false);
	// const [userVideos, setUserVideos] = useState([])

	const toggleLoad = (name) => {
		console.log("clicked");
		searchSigns(name)
		setModalLoad(true);
	};
	return (
		<div>
			{/* TWO OR MORE VIDEOS? */}
			<video width="300" height="240" controls>
				<source src={videoURL} type="video/mp4" />
			</video>
			<button onClick={() => toggleLoad(name)}> {name} </button>
			{modalLoad ? <SearchModal /> : null}
		</div>
	);
}


const mapDispatchToProps = dispatch => {
	return {
		searchSigns: (searchValue) =>
		dispatch({ type: "SEARCH_SIGNS", payload: { searchValue } }),	
	}
}

export default connect(null, mapDispatchToProps)(SignCard)