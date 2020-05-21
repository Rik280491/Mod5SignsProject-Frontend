import React from "react";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function DropdownSearch(props) {
	const {signs, onChange} = props

  return (
    <div style={{ width: 150, height: 75 }}>
      <Autocomplete
        id="free-solo-demo"
		freeSolo
		autoComplete 
		onChange={onChange}
        options={signs.map((option) => option.name)}
        renderInput={(params) => (
          <TextField {...params} label="Search" margin="normal" variant="outlined" onChange={onChange} />
        )}
      />
	  </div>
)}


const mapStateToProps = (state) => {
	return {
		signs: state.signs,
	};
};
export default connect(mapStateToProps, null)(DropdownSearch);
