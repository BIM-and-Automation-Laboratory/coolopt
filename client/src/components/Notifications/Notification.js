import React from "react";
import {Snackbar, Slide} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function Notification({
  message,
  status,
  open,
  handleClose,
  handleExited,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={SlideTransition}
      open={open}
      autoHideDuration={3500} //calls onClose after 3500ms (3.5secs)
      onClose={handleClose}
      onExited={handleExited}
    >
      <Alert variant="filled" elevation={6} severity={status}>
        {message}
      </Alert>
    </Snackbar>
  );
}
