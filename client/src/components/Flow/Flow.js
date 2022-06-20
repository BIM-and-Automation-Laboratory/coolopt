import React from "react";
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

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

export const Flow = ({ childFn }) => {
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const bimModelOptions = [
    { value: "Block F1 and F2", label: "Block F1 and F2" },
    { value: "Block F3", label: "Block F3" },
    { value: "Block F4", label: "Block F4" },
    { value: "Block C", label: "Block C" },
    { value: "Block D", label: "Block D" },
    { value: "MEP-Simple", label: "MEP-Simple" },
    { value: "Medical Facility", label: "Medical Facility" },
  ];

  const formik = useFormik({
    initialValues: {
      bimModel: "Medical Facility",
    },
  });

  const onChange = (value) => {
    formik.setFieldValue("bimModel", value.value);
    if (value.value == "Block F1 and F2") {
      childFn(
        "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvQkxPQ0tfRjFfYW5kX0YyJTIwXyUyMEh1aV9MaW5nX0NPQmllLnJ2dA"
      );
    } else if (value.value == "Block F3") {
      childFn(
        "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvQmxvY2slMjBGM19DT2JpZV9IZW5yeS5ydnQ"
      );
    } else if (value.value == "Block F4") {
      childFn(
        "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvQmxvY2slMjBGNF9DT2JpZV9IZW5yeS4wMDAxLnJ2dA"
      );
    } else if (value.value == "Block C") {
      childFn(
        "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvQmxvY2tfQ19DT0JpZV9IdWlfTGluZy5ydnQ"
      );
    } else if (value.value == "Block D") {
      childFn(
        "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvQmxvY2slMjBEX0NPYmllX0hlbnJ5LnJ2dA"
      );
    } else if (value.value == "MEP-Simple") {
      childFn(
        "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvTUVQJTIwMiUyMEdyYXBoXzEucnZ0"
      );
    } else if (value.value == "Medical Facility") {
      childFn(
        "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvTWVkaWNhbF9GYWNpbGl0eV9BdXRvZGVza19DT2JpZS5ydnQ"
      );
    }
  };

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

      data: {
        label: (
          <>
            Choose a <strong> model</strong>
            {/* <SplitButton
              id="bimModel"
              options={bimModelOptions}
              onChange={onChange}
            /> */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
                <FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label="(Disabled option)"
                />
              </RadioGroup>
            </FormControl>
          </>
        ),
      },
      position: { x: 100, y: 100 },
    },
    {
      id: "3",
      data: {
        label: (
          <>
            This one has a <strong>custom style</strong>
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
      id: "4",
      position: { x: 250, y: 200 },
      data: {
        label: "Another default node",
      },
    },
    {
      id: "5",
      data: {
        label: "Node id: 5",
      },
      position: { x: 250, y: 325 },
    },
    {
      id: "6",
      type: "output",
      data: {
        label: (
          <>
            An <strong>output node</strong>
          </>
        ),
      },
      position: { x: 100, y: 480 },
    },
    {
      id: "7",
      type: "output",
      data: { label: "Another output node" },
      position: { x: 400, y: 450 },
    },
  ];

  const initialEdges = [
    { id: "e1-2", source: "1", target: "2", label: "Default BIMS" },
    { id: "e1-3", source: "1", target: "3" },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      animated: true,
      label: "animated edge",
    },
    {
      id: "e4-5",
      source: "4",
      target: "5",
      label: "edge with arrow head",
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: "e5-6",
      source: "5",
      target: "6",
      type: "smoothstep",
      label: "smooth step edge",
    },
    {
      id: "e5-7",
      source: "5",
      target: "7",
      type: "step",
      style: { stroke: "#f6ab6c" },
      label: "a step edge",
      animated: true,
      labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === "input") return "#0041d0";
            if (n.type === "output") return "#ff0072";
            if (n.type === "default") return "#1a192b";

            return "#eee";
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;

            return "#fff";
          }}
          nodeBorderRadius={2}
        />
        <Controls />
        <Background color="white" gap={16} />
      </ReactFlow>
    </>
  );
};
