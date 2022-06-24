import React, { useCallback } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles({
  root: {
    background: "#e9e9e9",
    padding: "2px",
    marginTop: "10px",
  },
  styleWhileDragging: {
    textAlign: "center",
    padding: "2px",
    fontSize: "12px",
    letterSpacing: "1px",
    border: "1px dotted orange",
    textTransform: "none",
  },
  uploadIcon: { color: "#bcbcbc", margin: "10px" },
  defaultDropZoneStyle: {
    textAlign: "center",
    width: "100%",
    padding: "2px",
    fontSize: "12px",
    letterSpacing: "1px",
    textTransform: "none",
  },
});

function Upload(props) {
  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles) => {
    props.handleAddFilesToStage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: props.maxSize || 100000000,
    accept: props.accept || "",
  });

  return (
    <div className={classes.root} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Button className={classes.styleWhileDragging}>
          <p>Drop the lesson file here</p>
          <PublishIcon className={classes.uploadIcon} />
        </Button>
      ) : (
        <Button className={classes.defaultDropZoneStyle}>
          <p>Add file</p>
          <PublishIcon className={classes.uploadIcon} />
        </Button>
      )}
    </div>
  );
}

export default Upload;
