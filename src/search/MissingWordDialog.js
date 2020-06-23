import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Link } from "react-router-dom";
import InfoIcon from '@material-ui/icons/Info';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MissingWordDialog(props) {
    const { suggestedWord, definition, setSuggestedWord } = props
    const [open, setOpen] = React.useState(false);
    console.log(definition)
    
    
  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
    setSuggestedWord("")

  };

  return (
    <div>
      
      { suggestedWord ? <InfoIcon onClick={handleClickOpen} /> : null}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted

        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{suggestedWord}</DialogTitle>
        <DialogContent>
        
          <DialogContentText id="alert-dialog-slide-description">
            {definition.definitions.map(definition => <li>{definition.definition}</li>)}
          </DialogContentText>
          <DialogContentText style={{"font-weight": "bold" }}>
            Do you know the BSL sign for {suggestedWord} and want to contribute to the dictionary?
          </DialogContentText>
          <DialogContentText style={{ color: "red" }}>
          Note: Subject to Word Validation 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Go Back
          </Button>
          <Button onClick={handleClose} component={ Link } to="/upload"
             color="primary">
            Let's Go
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}