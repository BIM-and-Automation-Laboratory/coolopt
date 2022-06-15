import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "./gettingStartedCardStyle";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(styles);

const BlackOnWhiteTooltip = withStyles({
  arrow: {
    color: "white",
  },
  tooltip: {
    fontSize: "12px",
    color: "black",
    backgroundColor: "white",
  },
})(Tooltip);

const WhiteOnGreyTooltip = withStyles({
  tooltip: {
    fontSize: "12px",
    color: "#cfcfcf"
  },
})(Tooltip);


export default function GettingStartedCard({
  tooltipTitle,
  disabledStatus,
  icon,
  role,
  body,
  handleClick,
  renderCondition,
}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const content = (
    // button wrapped in span and then wrapped in tooltip to allow hover events even when button is disabled
    <span>
      <Button
        className={renderCondition ? classes.bigButton : classes.bigButtonDisabled}
        disabled={disabledStatus}
        onClick={handleClick}
      >
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Teacher" className={classes.avatar}>
                {icon}
              </Avatar>
            }
            className={classes.cardHeader}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" style={{ color: "#ff903e" }}>
              {role}
            </Typography>
            <p className={classes.body}>{body}</p>
          </CardContent>
        </Card>
      </Button>
    </span>
  );

  if (renderCondition) {
    return (
      <BlackOnWhiteTooltip
        open={open}
        title={tooltipTitle}
        arrow
        onClick={handleTooltipClose}
        onOpen={handleTooltipOpen}
        onClose={handleTooltipClose}
      >
        {content}
      </BlackOnWhiteTooltip>
    );
  }

  return (
    <WhiteOnGreyTooltip
      open={open}
      title={tooltipTitle}
      arrow
      onClick={handleTooltipClose}
      onOpen={handleTooltipOpen}
      onClose={handleTooltipClose}
    >
      {content}
    </WhiteOnGreyTooltip>
  );
}
