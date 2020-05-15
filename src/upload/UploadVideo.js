import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import SignCard from "../signs/SignCard";

function UploadVideo(props) {
	const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState("");
    const[signName, setSignName] = useState("")

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
        setSignName(e.target.value)
    }

	return (
		<div>
			{!props.username ? (
				<h1>
					To upload a video please <Link to="/login"> log in </Link> or
					<Link to="/signup"> Sign Up </Link>{" "}
				</h1>
			) : (
				<>
					<h1>Upload a Video</h1>
					<input type="text" name="signName" placeholder="Name of Sign" onChange={handleNameChange}  />
					<input
						type="file"
						name="file"
						placeholder="Upload a Video"
						onChange={handleChange}
					/>

					{loading ? (
						<h2>Loading...{video}</h2>
					) : (
						// better loading icon, progress bar?
						<SignCard name={signName} videoURL={video} />
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

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, null)(UploadVideo);
