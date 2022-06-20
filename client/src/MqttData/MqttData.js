import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import BeatLoader from "react-spinners/BeatLoader";
import { Grid } from "@material-ui/core";

export default function MqttData() {
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
  return (
    <>
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
    </>
  );
}
