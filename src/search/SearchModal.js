import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import SignCard from "../signs/SignCard";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function SearchModal(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const { searchedSigns, deselectSign } = props;

	// console.log(searchedSigns)

	useEffect(() => {
		searchedSigns.length > 0 ? handleOpen() : handleClose();
	});

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={() => deselectSign()}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						{searchedSigns
							? searchedSigns.map((sign) => (
									<SignCard
										name={sign.name}
										videoURL={sign.videos[0].video_url}
									/>
							  ))
							: null}
					</div>
				</Fade>
			</Modal>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		searchedSigns: state.searchedSigns,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deselectSign: () => dispatch({ type: "DESELECT_SIGN" }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
