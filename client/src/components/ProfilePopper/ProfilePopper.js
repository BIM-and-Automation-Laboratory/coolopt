import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { red } from "@material-ui/core/colors";
import { BiLogOutCircle } from "react-icons/bi";
import Divider from "@material-ui/core/Divider";
import { useAuth0 } from "@auth0/auth0-react";
import TuneSharpIcon from "@material-ui/icons/TuneSharp";
import { GET_ADMINS, } from "../../utils/graphql";
import { useQuery } from "@apollo/client";
import CustomButton from "../CustomButtons/Button";
import CircleSpinner from "../CircleSpinner/CircleSpinner";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  cardRoot: {
    backgroundColor: "white",
    maxWidth: "300px",
    minWidth: "180px",
    transition: "all 0.5s ease",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardHeader: {
    padding: "10px",
    marginBottom: "5px",
  },
  button: {
    width: "100%",
    padding: "10px 20px 10px 20px",
    margin: "auto",
    color: "black",
    textAlign: "start",
    boxShadow: "none",
    justifyContent: "flex-start",
    transition: "none",
  },
  avatarBtn: {
    borderRadius: "35px",
    minWidth: "10px",
    width: "35px",
    height: "35px",
    "&:hover": {
      color: "white",
      background: "#AAAAAA",
    },
  },
}));

export default function ProfilePopper(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const { user, logout } = useAuth0();

  const { sub, nickname } = user;

  const roles = user[process.env.REACT_APP_AUTH0_ROLES_NAMESPACE];

  const hasAdminRole = () =>
    roles && roles.some((role) => role === "Administrator");

  const { loading: getAdminsLoading, data: adminsData } = useQuery(GET_ADMINS);

  if (getAdminsLoading) return <CircleSpinner />;

  const admin =
    (adminsData && adminsData.Admin.find((admin) => admin.userId === sub)) ||
    [];

  return (
    <div className={classes.root}>
      <Card onMouseLeave={props.handleClose} className={classes.cardRoot}>
        <Link
          to={hasAdminRole() ? `/admin/${admin.adminId}/account` : "/"}
          style={{ textDecoration: "none" }}
        >
          <CustomButton
            className={classes.button}
            startIcon={<TuneSharpIcon />}
          >
            {" "}
            Manage account{" "}
          </CustomButton>
        </Link>
        <Divider />
        <CustomButton
          onClick={() => logout({ returnTo: window.location.origin })}
          className={classes.button}
          startIcon={<BiLogOutCircle color="red" />}
        >
          {" "}
          Log out{" "}
        </CustomButton>
      </Card>
    </div>
  );
}
