import React from "react";
import SignCard from "../signs/SignCard";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import VoiceOverOffIcon from '@material-ui/icons/VoiceOverOff';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
}));

function SearchSigns() {
	const classes = useStyles();

	return (
		<div className={classes.margin}>
			<Grid container spacing={3} alignItems="flex-end">
				<Grid item>
					<ImageSearchIcon />
				</Grid>
				<Grid item>
					<TextField id="input-with-icon-grid" label="Search"  />
				</Grid>
                <Grid item>
                    <VoiceOverOffIcon/>
                </Grid>
			</Grid>
		</div>
	);
}

export default SearchSigns;
