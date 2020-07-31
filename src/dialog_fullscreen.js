import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import {launchFullScreen} from './fullscreen.js';

export default function DialogFullscreen() {
    const [open, setOpen] = React.useState(true);

    const goFull = () => {
        launchFullScreen(document);
      }
  
    const handleClose = () => {
      setOpen(false);
    };

    const fullscreenOn = () =>
    {
        setOpen(false);
        goFull();
    };
  
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Включить полноэкранный режим?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Нет
            </Button>
            <Button onClick={fullscreenOn} color="primary" autoFocus>
              Да
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
