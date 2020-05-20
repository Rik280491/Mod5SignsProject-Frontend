import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import SignCard from "../signs/SignCard";
import { Link } from "react-router-dom";


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
	const { searchedSigns, deselectSign, selectedSign } = props;

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

	const handleUploadLink = (sign) => {
		console.log("clicked", sign)
		deselectSign();
		selectedSign(sign)
	}
	

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
									<>
									<SignCard
										name={sign.name}
										videoArr={sign.videos}
									/>
									
									<Link to="/upload" onClick={() => handleUploadLink(sign)}> Add your own version? </Link>
									</>
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
		selectedSign: (sign) => dispatch({type: "SELECTED_SIGN", payload: {sign}})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
