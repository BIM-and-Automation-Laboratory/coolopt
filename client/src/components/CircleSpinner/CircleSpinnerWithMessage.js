import React from "react";
import { Typography } from "@material-ui/core";
import CircleSpinner from "./CircleSpinner";

export default function CircleSpinnerWithMessage(props) {
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%" }}>
      <Typography>{props.loadingMessage}</Typography>
      <CircleSpinner />
    </div>
  );
}
