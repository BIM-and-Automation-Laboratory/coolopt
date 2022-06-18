import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Button } from "@material-ui/core";
import BeatLoader from "react-spinners/BeatLoader";
import { useFormik } from "formik";
import { io } from "socket.io-client";
import { GiAerialSignal } from "react-icons/gi";
import SplitButton from "../DropdownButton/DropdownButton";

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    width: "100%",
    margin: "10px 0",
    display: "block",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: 1,
    color: "grey",
  },
}));

export default function ChooseModels({ childFn }) {
  const classes = useStyles();

  const [mqttData, setMqttData] = useState({});

  // Create valid Socket.io Endpoint
  const ioEndpoint = `${window.location.origin.replace(
    `:${process.env.REACT_APP_PORT}`,
    ""
  )}:${process.env.REACT_APP_IO_PORT}`;
  console.log(ioEndpoint);

  useEffect(() => {
    const socket = io(ioEndpoint);
    socket.on("mqtt-temp-hum-data", (data) => {
      console.log(data.point);
      setMqttData(data.point);
    });
  }, []);

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

  return (
    <Card
      style={{
        borderLeft: "3px solid #09beb8",
        padding: "10px",
        minHeight: "300px",
        marginBottom: "10px",
      }}
    >
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <label className={classes.inputLabel}>Choose a BIM model</label>
        <SplitButton
          id="bimModel"
          options={bimModelOptions}
          onChange={(value) => {
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
          }}
        />
      </Grid>

      <Grid
        style={{ justifyContent: "center" }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <p>Temperature: {mqttData.Temperature_C || "No data"}</p>
        <p>Humidity: {mqttData.Humidity || "No data"}</p>
      </Grid>
      <Grid
        style={{ display: "flex", justifyContent: "center" }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <Button
          style={{
            border: "1px solid grey",
            textTransform: "none",
            margin: "10px",
            width: "200px",
            color: "black",
          }}
          disabled
          startIcon={
            !mqttData.Temperature_C ? (
              <BeatLoader
                loading={mqttData.Temperature_C == null ? true : false}
                size={5}
              />
            ) : (
              <GiAerialSignal fontSize={20} color="#00aa00" />
            )
          }
        >
          {mqttData.Temperature_C == null
            ? "Data is Loading"
            : "Data is Streaming"}
        </Button>
      </Grid>
    </Card>
  );
}
