//implement video.js after func reached
import React from "react";

export default function SignCard({ name, videoURL }) {
	console.log(videoURL);

	return (
		<div>
			<video width="300" height="240" controls>
				<source src={videoURL} type="video/mp4" />
			</video>
			<h5>{name}</h5>
		</div>
	);
}
