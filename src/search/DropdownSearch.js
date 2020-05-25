import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  inputRoot: {
    color: "white",
  
  }
}));


function DropdownSearch(props) {
	const { signs, onChange, speechPlaceholder} = props;
  const classes = useStyles();

  console.log(speechPlaceholder)
	return (
		<div style={{ width: 150, height: 70}}>
			<Autocomplete
      size="small"
				id="free-solo-demo"
				freeSolo
        autoComplete
        classes={classes}

        
				onChange={onChange}
				options={signs.map((option) => option.name)}
				renderInput={(params) => (
					<TextField
             {...params}
            
            
						label="Search"
						margin="normal"
            variant="outlined"
            
            // onChange={onChange}
            // placeholder={speechPlaceholder}
          
					/>
				)}
			/>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		signs: state.signs,
	};
};
export default connect(mapStateToProps, null)(DropdownSearch);
