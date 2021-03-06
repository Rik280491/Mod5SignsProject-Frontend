import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import API from "../API/API";
import DeleteDialog from "./DeleteDialog";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Player, ControlBar, VolumeMenuButton } from "video-react";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
	root: {
		maxWidth: 345,
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
				<Grid container spacing={4}>
					<Grid item key={video.id} xs={12} sm={6} md={4}>
						<Card className={classes.root}>
							<Player>
								<source src={video.video_url} />
								<ControlBar>
									<VolumeMenuButton disabled />
								</ControlBar>
							</Player>
							<Typography gutterBottom variant="h5" component="h2">
								{video.sign.name}
							</Typography>

							<Button
								size="small"
								variant="contained"
								color="secondary"
								onClick={() => openDialog(video.id)}
								className={classes.button}
								startIcon={<DeleteIcon />}
							>
								Delete
							</Button>
						</Card>
					</Grid>
				</Grid>
			);
		});
	};

	const openDialog = (id) => {
		setDeleteVideoID(id);
		setLoadDialog(true);
	};

	const removeVideo = () => {
		console.log("clicked", deleteVideoID);

		API.deleteVideo(deleteVideoID)
			.then(() => {
				const updatedVideos = allVideos.filter(
					(video) => video.id !== deleteVideoID
				);
				setAllVideos(updatedVideos);
			})
			.then(() => deleteSignVideo(deleteVideoID));
	};

	return (
		<div>
			{username ? (
				<h1 className="title">{username}'s uploaded Videos</h1>
			) : (
				<h1 className="title">You must be logged in to view this page</h1>
			)}

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
		deleteSignVideo: (deleteVideoID) =>
			dispatch({ type: "DELETE_SIGN_VIDEO", payload: { deleteVideoID } }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserVideos);
