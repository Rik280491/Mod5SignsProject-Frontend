import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux'



const filter = createFilterOptions();

function InputAutocomplete(props) {
//   const [value, setValue] = useState(null);
  const { onChange, signs } = props


  
  
  
  
  
  
  
  
  return (
    <Autocomplete
    //   value={value}
    //   onChange={(event, newValue) => {
    //     // Create a new value from the user input
    //     if (newValue && newValue.inputValue) {
    //       setValue({
    //         name: newValue.inputValue,
    //       });

    //       return;
    //     }

    //     setValue(newValue);
    //   }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            name: `${params.inputValue}`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="input-autocomplete"
      options={signs}
      onChange={onChange}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
        

      }}
      renderOption={(option) => option.name}
      style={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Add a BSL Sign" variant="outlined" onChange={onChange} />
      )}
    />
  );
}

const mapStateToProps = state => {
    return {
        signs: state.signs 
    }
}
export default connect(mapStateToProps, null)(InputAutocomplete)

