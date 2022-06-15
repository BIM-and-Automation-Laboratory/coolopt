import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, Grid, InputBase } from "@material-ui/core";
import { useShadeInputBaseStyles } from "@mui-treasury/styles/inputBase/shade";
import SplitButton from "../../components/DropdownButton/DropdownButton";
import { LinearGauge, RadialGauge } from "react-canvas-gauges";
import { useFormik } from "formik";
import BeatLoader from "react-spinners/BeatLoader";
import { GiAerialSignal } from "react-icons/gi";

const useStyles = makeStyles((theme) => ({
  bimViewerForgediv: {
    border: "solid rgb(220,220,220)",
    width: "60%",
    height: "80%",
    position: "fixed",
    // top: "110px",
    right: "10px",
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    fontSize: "12px",
    // padding: "10px",
    background: "rgb(243,243,243)",
    color: "black",
    letterSpacing: "1px",
    marginTop: "2px",
    marginBottom: "5px",
  },
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

function BIMModelsPage(props) {
  const classes = useStyles();
  const inputStyles = useShadeInputBaseStyles();

  const [mqttData, setMqttData] = useState({});
  const [modelUrn, setModelUrn] = useState(
    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvTUVQJTIwMiUyMEdyYXBoXzEucnZ0"
  );

  const formik = useFormik({
    initialValues: {
      bimModel: "Medical Facility",
    },
  });

  const bimModelOptions = [
    { value: "Block F1 and F2", label: "Block F1 and F2" },
    { value: "Block F3", label: "Block F3" },
    { value: "Block F4", label: "Block F4" },
    { value: "Block C", label: "Block C" },
    { value: "Block D", label: "Block D" },
    { value: "MEP-Simple", label: "MEP-Simple" },
    { value: "Medical Facility", label: "Medical Facility" },
  ];

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

  // explicitly read any global variables from window
  const Autodesk = window.Autodesk;

  // Get token from server
  // this function returns a promise and not the data itself
  const getForgeToken = () => {
    return fetch("/api/forge/oauth/token")
      .then((response) => response.json())
      .then((data) => data);
  };

  const initializeViewer = async (urn) => {
    getForgeToken().then((result) => {
      const token = result;

      const viewerOptions = {
        env: "AutodeskProduction",
        accessToken: token.access_token,
        api: "derivativeV2",
      };

      var config = {
        extensions: ["MyAwesomeExtension"],
      };
      var viewerContainer = document.getElementById("viewerContainer");
      var viewer = new Autodesk.Viewing.GuiViewer3D(viewerContainer, config);

      Autodesk.Viewing.Initializer(viewerOptions, () => {
        viewer.start();
        Autodesk.Viewing.Document.load(
          `urn:${urn}`,
          onDocumentLoadSuccess,
          onDocumentLoadFailure
        );
      });

      const onDocumentLoadSuccess = (doc) => {
        var defaultModel = doc.getRoot().getDefaultGeometry();
        viewer.loadDocumentNode(doc, defaultModel);
      };

      const onDocumentLoadFailure = (viewerErrorCode, viewerErrorMsg) => {
        console.error(
          "onDocumentLoadFailure() - errorCode:" +
            viewerErrorCode +
            "\n- errorMessage:" +
            viewerErrorMsg
        );
      };
    });
  };

  const urn = modelUrn;
  useEffect(() => {
    initializeViewer(urn);
  }, [modelUrn]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Card
          style={{
            borderLeft: "3px solid #09beb8",
            padding: "10px",
            minHeight: "200px",
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <label className={classes.inputLabel}>Choose a BIM model</label>
            <SplitButton
              id="bimModel"
              options={bimModelOptions}
              // value={bimModel}
              onChange={(value) => {
                formik.setFieldValue("bimModel", value.value);
                if (value.value == "Block F1 and F2") {
                  setModelUrn(
                    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvQkxPQ0tfRjFfYW5kX0YyJTIwXyUyMEh1aV9MaW5nX0NPQmllLnJ2dA"
                  );
                } else if (value.value == "Block F3") {
                  setModelUrn(
                    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvQmxvY2slMjBGM19DT2JpZV9IZW5yeS5ydnQ"
                  );
                } else if (value.value == "Block F4") {
                  setModelUrn(
                    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvQmxvY2slMjBGNF9DT2JpZV9IZW5yeS4wMDAxLnJ2dA"
                  );
                } else if (value.value == "Block C") {
                  setModelUrn(
                    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvQmxvY2tfQ19DT0JpZV9IdWlfTGluZy5ydnQ"
                  );
                } else if (value.value == "Block D") {
                  setModelUrn(
                    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvQmxvY2slMjBEX0NPYmllX0hlbnJ5LnJ2dA"
                  );
                } else if (value.value == "MEP-Simple") {
                  setModelUrn(
                    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvTUVQJTIwMiUyMEdyYXBoXzEucnZ0"
                  );
                } else if (value.value == "Medical Facility") {
                  setModelUrn(
                    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvTWVkaWNhbF9GYWNpbGl0eV9BdXRvZGVza19DT2JpZS5ydnQ"
                  );
                }
              }}
            />
          </Grid>

          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
          >
            <LinearGauge
              units="°C"
              title="Temperature"
              value={mqttData.Temperature_C}
              minValue={0}
              maxValue={50}
              majorTicks={[
                "0",
                "5",
                "10",
                "15",
                "20",
                "25",
                "30",
                "35",
                "40",
                "45",
                "50",
              ]}
              minorTicks={2}
              width={100}
              height={350}
              colorNeedle="#09beb8"
              colorBarProgress="red"
              colorBarEnd="red"
            />
            <LinearGauge
              units="%"
              title="Humidity"
              value={mqttData.Humidity}
              minValue={0}
              maxValue={100}
              majorTicks={[
                "0",
                "10",
                "20",
                "30",
                "40",
                "50",
                "60",
                "70",
                "80",
                "90",
                "100",
              ]}
              minorTicks={2}
              width={100}
              height={350}
              colorNeedle="red"
              animation={true}
              animationRule="bounce"
              animationDuration={2000}
              barBeginCircle={0}
              colorBarProgress="#09beb8"
              colorBarEnd="#09beb8"
            />
            <LinearGauge
              units="°C"
              title="Heat Index"
              value={mqttData.HeatIndex_C}
              minValue={0}
              maxValue={50}
              majorTicks={[
                "0",
                "5",
                "10",
                "15",
                "20",
                "25",
                "30",
                "35",
                "40",
                "45",
                "50",
              ]}
              minorTicks={2}
              width={100}
              height={350}
              colorNeedle="#09beb8"
              colorBarProgress="red"
              colorBarEnd="red"
            />
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
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <div className={classes.bimViewerForgediv} id="viewerContainer"></div>
      </Grid>
    </Grid>
  );
}

export default BIMModelsPage;
