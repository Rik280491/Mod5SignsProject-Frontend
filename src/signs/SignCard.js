//implement video.js after func reached
import React, { useState } from "react";
import SearchModal from "../search/SearchModal";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Player, ControlBar, VolumeMenuButton } from "video-react";
import "../../node_modules/video-react/dist/video-react.css";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
}));

function SignCard({ name, videoArr, searchSigns }) {
	const [modalLoad, setModalLoad] = useState(false);

	const classes = useStyles();

	const toggleLoad = (name) => {
		console.log("clicked");
		searchSigns(name);
		setModalLoad(true);
	};
	return (
		<Card className={classes.root}>
			{videoArr
				? videoArr.map((video) => {
						return (
							<Player fluid={false} width={300} height={200}>
								<source src={video.video_url} />
								<ControlBar>
									<VolumeMenuButton disabled />
								</ControlBar>
							</Player>
						);
				  })
				: null}

			<Typography
				onClick={() => toggleLoad(name)}
				gutterBottom
				variant="h6"
				component="h4"
			>
				{name}
			</Typography>
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
