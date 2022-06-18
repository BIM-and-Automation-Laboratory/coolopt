import React, { useState, useEffect, useContext } from "react";
import Upload from "../../components/FileUpload/Upload";
import FileList from "../../components/FileUpload/FileList";
import StagedFileList from "../../components/FileUpload/StagedFileList";
import { Button, Card, CardContent, makeStyles } from "@material-ui/core";
import { BsFilesAlt } from "react-icons/bs";
import { NotificationContext } from "../../components/Notifications/NotificationContext";

const useStyles = makeStyles((theme) => ({
  addFilesBtn: {
    width: "120px",
    padding: "2px",
    margin: "10px 10px 10px 0px",
    textTransform: "none",
    background: "#ff5e00",
    color: "white",
    "&:hover": {
      background: "#D34D00",
    },
  },
  addFilesBtnLoading: {
    width: "120px",
    padding: "2px",
    margin: "10px 10px 10px 0px",
    textTransform: "none",
    background: "grey",
    color: "white",
    "&:hover": {
      background: "grey",
    },
  },
}));

export default function EstateDocPage() {
  const classes = useStyles();

  const { createNotification } = useContext(NotificationContext);

  // states
  const [files, setFiles] = useState([]);
  const [uploadFileLoading, setUploadFileLoading] = useState(false);

  // ############################################################################
  // File handling (files to be uploaded)
  // ############################################################################

  // Adding a file to the list of files to be uploaded
  const handleAddFilesToStage = (acceptedFiles) => {
    setFiles((prevFiles) => {
      return [...prevFiles, ...acceptedFiles];
    });
  };

  // Handler for deleting a assignment file that has been staged(this fn is passed
  // down as a prop to the assignment creator component)
  const handleRemoveFileFromStage = (selectedFileIdx) => {
    const filtered = files.filter((file, index) => index !== selectedFileIdx);
    setFiles(filtered);
  };

  const handleSubmitFiles = () => {
    const formData = new FormData();
    // TODO: Error handling for COBie submittals before the get to the api.
    formData.append("file", files[0]);
    setUploadFileLoading(true);
    fetch("/api/lbd/semantic-injection", {
      // No need to set the 'Content-Type: multipart/form-data' header.
      // The browser will set it, including the boundary parameter.
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((r) => {
        console.log(r);
        setUploadFileLoading(false);
        // clear the sent files from stage after successful upload
        setFiles([]);
        if (r.message === "File uploaded successuly")
          createNotification({
            message: `File submitted successfuly`,
            status: "success",
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        setUploadFileLoading(false);
      });
  };

  const code = `
  import React from 'react'
  export default function RolesAuthPage() {
    return (
      <div>
        <h1 style={{color: "white"}}>Roles and Auth Assignment</h1>
      </div>
    )
  }
  `;

  return (
    <>
      <Card
        style={{
          minWidth: "300px",
          // height: "120px",
          borderLeft: "5px solid #D8973C",
          borderRadius: "0px",
          margin: "10px",
        }}
      >
        <CardContent>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <BsFilesAlt
              style={{
                fontSize: "20px",
                color: "#D8973C",
                marginRight: "10px",
              }}
            />
            <p style={{ fontSize: "16px", fontWeight: 800 }}>COBie Files</p>
          </div>

          <p style={{ fontSize: "14px", color: "grey" }}>Convert a COBie file into a Linked Building Data Knowledge Graph</p>
          <p style={{ fontSize: "16px", fontWeight: 800, marginTop: "20px" }}>Upload a COBie file (.xls files less than 50MBs only)</p>
          <div style={{ maxWidth: "500px" }}>
            <Upload maxSize="50000000" accept=".xls" handleAddFilesToStage={handleAddFilesToStage} />
            <StagedFileList stagedFilesForUpload={files} handleRemoveFileFromStage={handleRemoveFileFromStage} />
            {files.length > 0 && (
              <Button className={uploadFileLoading ? classes.addFilesBtnLoading : classes.addFilesBtn} onClick={handleSubmitFiles}>
                Submit file
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
