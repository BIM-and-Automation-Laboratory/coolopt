import React, { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import { useFormik } from "formik";
import { MarkerType } from "react-flow-renderer";
import SplitButton from "../SplitButton/SplitButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Handle, Position } from "react-flow-renderer";
import { Button, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Upload from "../FileUpload/Upload";
import StagedFileList from "../FileUpload/StagedFileList";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
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
});

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

function CustomBimUploadNode({ data }) {
  const classes = useStyles();
  // states
  const [files, setFiles] = useState([]);
  const [uploadFileLoading, setUploadFileLoading] = useState(false);

  const handleSubmitFiles = () => {
    console.log("Submitted");
  };
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
  return (
    <Card style={{ padding: "10px 10px 10px 10px" }}>
      <p style={{ fontSize: "12px" }}>{data?.title}</p>
      <Handle type="target" position={Position.Top} />
      <Upload
        maxSize="50000000"
        accept=".xls"
        handleAddFilesToStage={handleAddFilesToStage}
      />
      <StagedFileList
        stagedFilesForUpload={files}
        handleRemoveFileFromStage={handleRemoveFileFromStage}
      />
      {files.length > 0 && (
        <Button
          className={
            uploadFileLoading ? classes.addFilesBtnLoading : classes.addFilesBtn
          }
          onClick={handleSubmitFiles}
        >
          Submit file
        </Button>
      )}
      <Handle type="source" position={Position.Bottom} id="a" />
    </Card>
  );
}

export const Flow = ({ childFn }) => {
  const nodeTypes = useMemo(
    () => ({
      customBimUpload: CustomBimUploadNode,
    }),
    []
  );

  const initialNodes = [
    {
      id: "1",
      type: "input",
      data: {
        label: (
          <>
            Welcome to our <strong>Research POC pipeline</strong>
          </>
        ),
      },
      position: { x: 250, y: 0 },
    },
    {
      id: "2",
      type: "customBimUpload",
      data: {
        title: (
          <>
            Upload a <strong>custom BIM</strong>
          </>
        ),
      },
      position: { x: 400, y: 100 },
      style: {
        background: "#D6D5E6",
        color: "#333",
        border: "1px solid #222138",
        width: 180,
      },
    },
    {
      id: "3",
      position: { x: 300, y: 300 },
      data: {
        label: (
          <>
            <strong>COBie file</strong>
          </>
        ),
      },
    },
    {
      id: "4",
      type: "customBimUpload",
      data: {
        title: (
          <>
            Upload a <strong>COBie</strong> file
          </>
        ),
      },
      position: { x: 540, y: 300 },
      style: {
        background: "#D6D5E6",
        color: "#333",
        border: "1px solid #222138",
        width: 180,
      },
    },
    {
      id: "5",
      data: {
        label: "Knowledge Representation Learning",
      },
      position: { x: 200, y: 420 },
    },
    {
      id: "6",
      data: {
        label: (
          <>
            <strong>SPARQL</strong> Query Engine
            <br />
            (Query the BIM)
          </>
        ),
      },
      position: { x: 400, y: 420 },
    },
    {
      id: "7",
      type: "output",
      data: {
        label: (
          <>
            Trained <strong>KRL inference (recommendation ranking)</strong>{" "}
            model
          </>
        ),
      },
      position: { x: 200, y: 550 },
    },
  ];

  const initialEdges = [
    { id: "e1-2", source: "1", target: "2", label: "Default BIMS" },
    { id: "e1-3", source: "1", target: "3", label: "Custom BIMS" },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      animated: true,
      label: "COBie submitted",
    },
    {
      id: "e3-5",
      source: "3",
      target: "5",
      animated: true,
      label: "COBie not submitted",
    },
    // {
    //   id: "e4-5",
    //   source: "4",
    //   target: "5",
    //   label: "edge with arrow head",
    //   markerEnd: {
    //     type: MarkerType.ArrowClosed,
    //   },
    // },
    {
      id: "e4-6",
      source: "4",
      target: "6",
      animated: true,
      label: "Send to KRL AI",
    },
    {
      id: "e4-7",
      source: "4",
      target: "7",
      animated: true,
      label: "Send to Query Engine",
    },
    {
      id: "e6-8",
      source: "6",
      target: "8",
      type: "step",
      style: { stroke: "red" },
      label: "Training",
      animated: true,
      labelStyle: { fill: "red", fontWeight: 700 },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="bottom-left"
    >
      <Controls />
      <Background color="white" gap={16} />
    </ReactFlow>
  );
};
