import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import API from "../API/API";
import DeleteDialog from "./DeleteDialog";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}));

function UserVideos(props) {
	const { username, deleteSignVideo } = props;
	const [allVideos, setAllVideos] = useState([]);
	const [loadDialog, setLoadDialog] = useState(false);
	const [deleteVideoID, setDeleteVideoID] = useState(null);

	const classes = useStyles();

	useEffect(() => {
		API.getVideos().then((videos) => {
			setAllVideos(videos);
		});
	}, []);

	const findUserVideos = () => {
		console.log(allVideos);
		const userVideos = allVideos.filter(
			(video) => video.user.username === username
		);

		return userVideos.map((video) => {
			return (
				<div>
					<video width="300" height="240" controls>
						<source src={video.video_url} type="video/mp4" />
					</video>
					<h4>{video.sign.name}</h4>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => openDialog(video.id)}
						className={classes.button}
						startIcon={<DeleteIcon />}
					>
						Delete
					</Button>
				</div>
			);
		});
	};

	const openDialog = (id) => {
		setDeleteVideoID(id);
		setLoadDialog(true);
	};

	const removeVideo = () => {
		console.log("clicked", deleteVideoID);

		API.deleteVideo(deleteVideoID).then(() => {
			const updatedVideos = allVideos.filter(
				(video) => video.id !== deleteVideoID
			);
			setAllVideos(updatedVideos);
		});
	};

	return (
		<div>
			<h1>{username}'s uploaded Videos</h1>

			{findUserVideos()}
			{loadDialog ? (
				<DeleteDialog removeVideo={removeVideo} setLoadDialog={setLoadDialog} />
			) : null}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		username: state.username,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteSignVideo: (id) =>
			dispatch({ type: "DELETE_SIGN_VIDEO", payload: { id } }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserVideos);
