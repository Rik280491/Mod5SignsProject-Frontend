import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import SignCard from "../signs/SignCard";
import API from "../API/API";
import CircularProgress from '@material-ui/core/CircularProgress';


function UploadVideo({ username }) {
	const [loading, setLoading] = useState(false);
	const [video, setVideo] = useState(null);
	const [signName, setSignName] = useState("");
	const [newSign, setNewSign] = useState(null);

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

	const handlePost = () => {
		API.createSign({
			name: signName,
		}).then((sign) => setNewSign(sign));
        console.log(newSign)
        // API.createVideo(
		// 	{
		// 		video_url: video,
		// 		sign: newSign (this is null)
		// 	},
		// 	localStorage.token
		// ).then((video) => console.log(video));
	};

	const handleVideoPost = () => {
	   console.log(newSign)
	    API.createVideo({
	        video_url: video,
	        sign: newSign
	    }, localStorage.token ).then(video => console.log(video))
	}

	return (
		<div>
			{!username ? (
				<h1>
					To upload a video please <Link to="/login"> log in </Link> or
					<Link to="/signup"> Sign Up </Link>{" "}
				</h1>
			) : (
				<>
					<h1>Upload a Video</h1>
					<input
						type="text"
						name="signName"
						placeholder="Name of Sign"
						onChange={handleNameChange}
					/>
					<input
						type="file"
						name="file"
						placeholder="Upload a Video"
						onChange={handleChange}
					/>

					{loading ? (
						<CircularProgress/>
					) : (
						// better loading icon, progress bar?
						<>
							<SignCard name={signName} videoURL={video} />
							<button onClick={handlePost}>UPLOAD</button>
                            <button onClick={handleVideoPost}>TEST</button>
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
	};
};

export default connect(mapStateToProps, null)(UploadVideo);
