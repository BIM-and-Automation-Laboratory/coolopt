import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SpinnerDiamond } from "spinners-react";
import styles from "./spinnerStyle";

const useStyles = makeStyles(styles);

export default function Spinner(props) {
  const classes = useStyles();

  return (
    <SpinnerDiamond
      size={60} 
      thickness={117} 
      speed={180} 
      color="black" 
      secondaryColor="white"
      className={classes.root}
    />
  );
}
