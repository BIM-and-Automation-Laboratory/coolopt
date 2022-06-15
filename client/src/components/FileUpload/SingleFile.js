import React, { useState, useContext } from "react";
import { NotificationContext } from "../../components/Notifications/NotificationContext";
import { makeStyles, IconButton, Button } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  AiOutlineFileImage,
  AiOutlineFileWord,
  AiOutlineFileExcel,
  AiFillFile,
  AiOutlineFileText,
} from "react-icons/ai";
import { FaRegFilePowerpoint } from "react-icons/fa";
import { VscFilePdf } from "react-icons/vsc";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  DELETE_FILE,
  GET_ADMINS, REMOVE_FILE, 
} from "../../utils/graphql";
import { useMutation, useQuery } from "@apollo/client";
import CircleSpinner from "../../components/CircleSpinner/CircleSpinner";

const useStyles = makeStyles({
  root: {
    background: "#e9e9e9",
    padding: "5px",
    marginTop: "10px",
  },
  stagedFile: {
    display: "flex",
    justifyContent: "space-between",
    borderLeft: "3px solid #ff5e00",
    margin: "10px",
    padding: "10px",
    background: "#FFFFFF",
    fontSize: "12px",
    letterSpacing: "1px",
  },
  stagedFileTypeIcon: {
    fontSize: "25px",
    marginRight: "10px",
    color: "grey",
  },
  stagedFileDeleteRoot: {
    width: "20px",
    height: "20px",
  },
  stagedFileDelete: { color: "#ff5e00", fontSize: "20px" },
  dbFileDelete: { color: "#ff5e00", fontSize: "15px" },
  warning: {
    background: "#fffbdd",
    height: "80px",
    lineHeight: "80px",
    textAlign: "center",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #d3cfb7",
  },
  link: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "#ff5e00",
    },
  },
});

function SingleFile({ file, index, handleRemoveFileFromStage }) {
  const classes = useStyles();

  const { createNotification } = useContext(NotificationContext);

  const { user } = useAuth0();

  const { sub } = user;

  const roles = user[process.env.REACT_APP_AUTH0_ROLES_NAMESPACE];

  // states
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);


  // Mutation
  const [removeFile, { loading: removeFileLoading }] = useMutation(
    REMOVE_FILE,
    {
      onCompleted: () => {
        console.log("File has been deleted from google cloud successfully");
      },
    }
  );

  const [deleteFile, { loading: deleteFileLoading }] = useMutation(
    DELETE_FILE,
    {
      onCompleted: () => {
        createNotification({
          message: "File has been deleted",
          status: "warning",
        });
        console.log("File metadata has been deleted from neo4j successfully");
      },
    }
  );

  const switchFileTypeIcon = (type) => {
    switch (type) {
      case "application/pdf":
        return <VscFilePdf className={classes.stagedFileTypeIcon} />;
      case "text/plain":
        return <AiOutlineFileText className={classes.stagedFileTypeIcon} />;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <AiOutlineFileWord className={classes.stagedFileTypeIcon} />;
      case "application/vnd.ms-excel":
        return <AiOutlineFileExcel className={classes.stagedFileTypeIcon} />;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return <FaRegFilePowerpoint className={classes.stagedFileTypeIcon} />;
      case "image/png":
        return <AiOutlineFileImage className={classes.stagedFileTypeIcon} />;
      case "image/jpeg":
        return <AiOutlineFileImage className={classes.stagedFileTypeIcon} />;
      default:
        return <AiFillFile className={classes.stagedFileTypeIcon} />;
    }
  };

  const handleRemoveFileFromCloudAndNeo = () => {
    removeFile({
      variables: {
        gcName: file.gcName,
      },
    }).then(() => {
      deleteFile({
        variables: {
          fileId: file.fileId,
        },
      })
    });
  };

  // ############################################################################
  // Dialog handlers
  // ############################################################################
  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <div className={classes.stagedFile}>
      <a className={classes.link} href={file.url} target="_blank">
        <div style={{ display: "flex" }}>
          {switchFileTypeIcon(file.type)}
          <p style={{ lineHeight: "25px" }}>{file.name}</p>{" "}
        </div>
      </a>
      {handleRemoveFileFromStage ? (
        <IconButton
          onClick={() => {
            handleRemoveFileFromStage(index);
          }}
          className={classes.stagedFileDeleteRoot}
        >
          <RemoveIcon className={classes.stagedFileDelete} />
        </IconButton>
      ) : (
        <div>
          <Button
            onClick={handleConfirmDialogOpen}
            style={{ width: "40px", minWidth: "40px" }}
          >
            <RiDeleteBin6Line className={classes.dbFileDelete} />
          </Button>
          <ConfirmDialog
            open={confirmDialogOpen}
            handleClose={handleConfirmDialogClose}
            actionHandler={handleRemoveFileFromCloudAndNeo}
            actionBtnMessage="Delete this File"
            actionBtnMessageLoading={"Deleting file..."}
            dialogActionBtnLoading={removeFileLoading || deleteFileLoading}
            confirmMessageTitle="Are you sure you want to delete this file?"
            confirmMessage={
              <>
                <p className={classes.warning}>
                  Unexpected bad things will happen if you don’t read this!
                </p>
                <p style={{ fontSize: "15px" }}>
                  This action <strong>cannot</strong> be undone. The file will
                  be permanently deleted.
                </p>
              </>
            }
          />{" "}
        </div>
      )}
    </div>)
}

export default SingleFile;
