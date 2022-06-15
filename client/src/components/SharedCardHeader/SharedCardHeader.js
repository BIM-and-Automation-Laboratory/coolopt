import React from "react";
import { CardHeader, Avatar, IconButton, makeStyles } from "@material-ui/core";
import styles from "./SharedCardHeaderStyle";

const useStyles = makeStyles(styles);

function SharedCardHeader(props) {
  const classes = useStyles();

  return (
    <CardHeader
      title={props.title}
      subheader={props.subheader && props.subheader}
      titleTypographyProps={{ variant: "h5" }}
      style={props.color ? { color: props.color } : { color: "#9076d1" }}
      avatar={props.avatarIcon && <Avatar>{props.avatarIcon}</Avatar>}
      action={
        props.icon ? (
          <IconButton className={classes.iconButton} aria-label="settings">
            {props.icon}
          </IconButton>
        ) : (
          props.action
        )
      }
    />
  );
}

export default SharedCardHeader;
