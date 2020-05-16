import React, {useState} from "react";
import { connect } from 'react-redux'
import SignCard from "../signs/SignCard";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import VoiceOverOffIcon from '@material-ui/icons/VoiceOverOff';


const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
}));

function SearchSigns(props) {
    const classes = useStyles();
    const {searchSigns} = props
    
const onChange = (e) => {
    searchSigns(e.target.value)
} 

	return (
		<div className={classes.margin}>
			<Grid container spacing={3} alignItems="flex-end">
				<Grid item>
					<ImageSearchIcon />
				</Grid>
				<Grid item>
					<TextField onChange={onChange} id="input-with-icon-grid" label="Search"  />
				</Grid>
                <Grid item>
                    <VoiceOverOffIcon/>
                </Grid>
			</Grid>
		</div>
	);
}

const mapStateToProps = state => {
    return{}
}

const mapDispatchToProps = (dispatch) => {
	return {
		searchSigns: (searchValue) => dispatch({ type: "SEARCH_SIGNS", payload: {searchValue}})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchSigns);


