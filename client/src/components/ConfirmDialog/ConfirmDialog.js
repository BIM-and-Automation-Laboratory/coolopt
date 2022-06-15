import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, Typography } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  dangerButton: {
    width: "180px",
    fontWeight: "900",
    border: "1px solid #d3cfb7",
    color: "#ef5350",
    textTransform: "none",
    "&:hover": {
      color: "white",
      background: "#E01815",
    },
  },
  dangerButtonLoading: {
    width: "180px",
    color: "#ef5350",
    border: "1px solid #d3cfb7",
    textTransform: "none",
    "&:hover": {
      background: "#E01815",
    },
  },
  cancelButton: {
    textTransform: "none",
    width: "100px",
    fontWeight: "900",
    color: "#604a9f",
    border: "1px solid #d3cfb7",
  },
  cancelButtonloading: {
    textTransform: "none",
    width: "100px",
    fontWeight: "900",
    color: "#604a9f",
    border: "1px solid #d3cfb7",
  }
}));

export default function ConfirmDialog({
  open,
  handleClose,
  actionHandler,
  actionBtnMessage,
  actionBtnMessageLoading,
  confirmMessage,
  confirmMessageTitle,
  dialogActionBtnLoading,
}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" disableTypography>
          <Typography variant="subtitle1">{confirmMessageTitle}</Typography>
        </DialogTitle>
        <DialogContent>{confirmMessage}</DialogContent>
        <DialogActions>
          <Button
            style={{
              textTransform: "none",
              width: "100px",
              fontWeight: "900",
              color: "#604a9f",
              border: "1px solid #d3cfb7",
            }}
            onClick={handleClose}
          >
            My bad!
          </Button>
          <Button
            className={
              dialogActionBtnLoading
                ? classes.dangerButtonLoading
                : classes.dangerButton
            }
            onClick={actionHandler}
            disabled={dialogActionBtnLoading}
            autoFocus
          >
            {dialogActionBtnLoading
              ? actionBtnMessageLoading
              : actionBtnMessage}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
