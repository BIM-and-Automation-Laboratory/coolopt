import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import CircleSpinner from "../CircleSpinner/CircleSpinner"

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(0),
    },
  },
}));

export default function Navatar(props) {
  const classes = useStyles();

  const { user, isLoading } = useAuth0();

  const { name, picture } = user;

  if (isLoading) {
    return <CircleSpinner loading={isLoading} />;
  }

  return (
    <div className={classes.root}>
      <Avatar style={{width: "30px", height: "30px"}} alt={name} src={picture} />
    </div>
  );
}
