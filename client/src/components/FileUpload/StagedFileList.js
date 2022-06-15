import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import SingleFile from "./SingleFile";

const useStyles = makeStyles({
  root: {
    background: "#e9e9e9",
    padding: "5px",
    marginTop: "10px",
  },
});

function StagedFileList(props) {
  const classes = useStyles();

  const ref = React.createRef();

  const scrollToNewFile = () =>
    ref.current &&
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

  console.log(props.stagedFilesForUpload)

  // auto scroll when  to the new latest file that is added to the list
  useEffect(() => {
    // run side effect only when there are files in the list
    // this prevents autoscrolling to the bottom upon the initial mount
    // FIXME: Fix scroll glitch
    if (props.stagedFilesForUpload && props.stagedFilesForUpload.length > 0)
      scrollToNewFile();
  }, [props.stagedFilesForUpload]);

  return props.stagedFilesForUpload && props.stagedFilesForUpload.length > 0 ? (
    <div className={classes.root}>
      {props.stagedFilesForUpload.map((file, index) => (
        <SingleFile
          key={index}
          file={file}
          index={index}
          stagedFilesForUpload={props.stagedFilesForUpload}
          handleRemoveFileFromStage={props.handleRemoveFileFromStage}
        />
      ))}
      <div ref={ref}></div>
    </div>
  ) : (
    <div ref={ref}></div>
  );
}

export default StagedFileList;
