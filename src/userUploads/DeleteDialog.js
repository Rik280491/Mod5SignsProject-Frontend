import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function DeleteDialog(props) {
  const [open, setOpen] = useState(false);
  const [deleteVideo, setDeleteVideo] = useState(false)
  const { removeVideo, setLoadDialog } = props 
  
  useEffect(() => {
    !deleteVideo ? handleClickOpen() : handleClose()
  }, [])
  
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteAndClose = () => {
    removeVideo()
    handleClose()

  }
  const handleClose = () => {
    setDeleteVideo(true)
    setOpen(false);
    setLoadDialog(false)
  };


  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your video?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          This is permanent!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Go Back
          </Button>
          <Button onClick={deleteAndClose} color="primary" autoFocus>
            I'm Sure
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



export default DeleteDialog
