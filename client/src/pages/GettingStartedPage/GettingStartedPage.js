import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./gettingStartedPageStyle";
import { gettingStartedOptions } from "../../utils/gettingStartedOptions";
import GettingStartedCard from "../../components/GettingStarted/GettingStartedCard";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import { TextField } from "@material-ui/core";
import { CREATE_ADMIN } from "../../utils/graphql";
import BeatLoader from "react-spinners/BeatLoader";
import { useMutation } from "@apollo/client";

const useStyles = makeStyles(styles);

export default function GettingStartedPage() {
  const classes = useStyles();

  const { user } = useAuth0();

  const { nickname, email, sub } = user;

  const roles = user[process.env.REACT_APP_AUTH0_ROLES_NAMESPACE];

  // state initialization for profile dialogs.
  const [adminProfileDialogOpen, setAdminProfileDialogOpen] = useState(false);
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());

  // state initialization for admin.
  const [adminFullName, setAdminFullName] = useState("");
  const [adminIdNumber, setAdminIdNumber] = useState("");
  const [adminEmail, setAdminEmail] = useState(email);
  const [adminUsername, setAdminUsername] = useState(nickname);

  // ############################################################################
  // Mutation hooks
  // ############################################################################

  // create admin profile
  const [createAdmin, { loading: createAdminLoading }] = useMutation(
    CREATE_ADMIN,
    {
      onCompleted: () => {
        window.location.reload();
      },
    }
  );

  // #############################################
  //  Admin (Value Change handlers)
  //
  // #############################################

  const handleChangeAdminFullName = (event) => {
    setAdminFullName(event.target.value);
  };

  const handleChangeAdminIdNumber = (event) => {
    setAdminIdNumber(event.target.value);
  };

  // #############################################
  //  Profile Create handlers
  //
  // #############################################

  // Admin
  const handleCreateAdminProfile = (event) => {
    event.preventDefault();
    createAdmin({
      variables: {
        createdAt: { formatted: createdAt },
        userId: sub,
        fullName: adminFullName,
        email: adminEmail,
        username: adminUsername,
        identificationNumber: adminIdNumber,
      },
    });
  };

  // #############################################
  //  Dialog Openers (handlers)
  //
  // #############################################

  const handleClickAdminDialogOpen = () => {
    setAdminProfileDialogOpen(true);
  };

  // #############################################
  //  Dialog Opener Array
  //
  // #############################################

  const dialogOpenerArray = [handleClickAdminDialogOpen];

  // #############################################
  //  Dialog Closers (handlers)
  //
  // #############################################

  const handleAdminDialogClose = () => {
    setAdminProfileDialogOpen(false);
  };

  // #############################################
  //  CustomDialog props array
  //
  // #############################################

  const customDialogPropsArray = [
    {
      role: "Admin",
      title: "Administrator's profile creator",
      dialogOpen: adminProfileDialogOpen,
      handleDialogClose: handleAdminDialogClose,
      actionButtonLabel: "Create Profile",
      dialogActionBtnLoading: createAdminLoading,
      handleCreateProfile: handleCreateAdminProfile,
      handleChangeFullName: handleChangeAdminFullName,
      handleChangeIdNumber: handleChangeAdminIdNumber,
      fullname: adminFullName,
      idNumber: adminIdNumber,
      email: adminEmail,
      username: adminUsername,
    },
  ];

  return (
    <>
      <h1 className={classes.h1}>Getting Started</h1>
      <div className={classes.root}>
        {gettingStartedOptions.map((option, index) => {
          // while mapping check if one of the user's roles coincides with the options on the getting started
          const isAllowed = roles.some((role) => option.role === role);

          return (
            <GettingStartedCard
              handleClick={dialogOpenerArray[index]}
              role={option.role}
              icon={option.icon}
              body={option.body}
              key={index}
              disabledStatus={!isAllowed}
              tooltipTitle={
                isAllowed
                  ? "You have access to this resource"
                  : "You do not have access to this resource"
              }
              renderCondition={isAllowed}
            />
          );
        })}
      </div>
      {customDialogPropsArray.map((propSet, index) => (
        <CustomDialog
          key={index}
          title={propSet.title}
          dialogOpen={propSet.dialogOpen}
          handleDialogClose={propSet.handleDialogClose}
          actionButtonLabel={propSet.actionButtonLabel}
          actionButtonClickHandler={propSet.handleCreateProfile}
          dialogActionBtnLoading={propSet.dialogActionBtnLoading}
          actionBtnLoadingMsg={
            <BeatLoader loading={propSet.dialogActionBtnLoading} size={5} />
          }
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              autoFocus
              id="full-name"
              label="Full name"
              value={propSet.fullName}
              onChange={propSet.handleChangeFullName}
              helperText="As per your official identification document"
              variant="filled"
              style={{ margin: "20px", width: "280px" }}
            />
            <TextField
              id="id-no"
              label="Identification number"
              value={propSet.idNumber}
              onChange={propSet.handleChangeIdNumber}
              helperText="Can't be changed again without an admin"
              variant="filled"
              style={{ margin: "20px", width: "280px" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              disabled
              id="email"
              label="Email"
              value={propSet.email}
              helperText="Auto-populated based on login."
              variant="filled"
              style={{ margin: "20px", width: "280px" }}
            />
            <TextField
              disabled
              id="username"
              label="Username"
              // defaultValue="teenkevo"
              value={propSet.username}
              helperText="Auto-populated based on login."
              variant="filled"
              style={{ margin: "20px", width: "280px" }}
            />
          </div>
        </CustomDialog>
      ))}
    </>
  );
}
