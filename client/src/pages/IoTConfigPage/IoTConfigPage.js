import React, { useState, useContext } from "react";
import { NotificationContext } from "../../components/Notifications/NotificationContext";
import { useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import BeatLoader from "react-spinners/BeatLoader";
import { useFormik } from "formik";
import MqttConfig from "../../components/Forms/MqttConfig";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  InputBase,
} from "@material-ui/core";
import { BiServer } from "react-icons/bi";
import {
  AiFillApi,
  AiFillCode,
  AiOutlineApi,
  AiOutlineCode,
} from "react-icons/ai";
import { WiCloudUp } from "react-icons/wi";
import { IoIosFingerPrint } from "react-icons/io";
import MqttTopic from "../../components/Forms/MqttTopic";
import { useShadeInputBaseStyles } from "@mui-treasury/styles/inputBase/shade";
import DropdownButton from "../../components/DropdownButton/DropdownButton";

export default function IoTConfigPage(props) {
  const inputStyles = useShadeInputBaseStyles();
  const { createNotification } = useContext(NotificationContext);

  const history = useHistory();

  const { user } = useAuth0();

  const { sub } = user;

  const roles = user[process.env.REACT_APP_AUTH0_ROLES_NAMESPACE];

  // ############################################################################
  // Mqtt COnfig states
  // ############################################################################
  const [mqttConfigDialogOpen, setMqttConfigDialogOpen] = useState(false);
  const [mqttTopicDialogOpen, setMqttTopicDialogOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      unitTitle: "",
    },
    onSubmit: ({ title, description, date }) => {},
  });

  // ############################################################################
  // Mqtt Config Dialog handlers
  // ############################################################################

  const handleMqttConfigDialogClose = () => {
    setMqttConfigDialogOpen(false);
    formik.resetForm();
  };

  const handleMqttConfigDialogOpen = () => {
    setMqttConfigDialogOpen(true);
    formik.resetForm();
  };

  // ############################################################################
  // Mqtt Topic Dialog handlers
  // ############################################################################

  const handleMqttTopicDialogClose = () => {
    setMqttTopicDialogOpen(false);
    formik.resetForm();
  };

  const handleMqttTopicDialogOpen = () => {
    setMqttTopicDialogOpen(true);
    formik.resetForm();
  };

  return (
    <div>
      {/* MQTT Configuration Dialog */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <Card
            style={{
              borderRadius: "0px",
              height: "100%",
            }}
          >
            <CardHeader
              title="Broker connection"
              titleTypographyProps={{ variant: "h6" }}
              style={{ background: "black", color: "white" }}
            />
            <Divider style={{ background: "grey", height: "2px" }} />
            <CardContent style={{ margin: 0, padding: 0 }}>
              <div
                style={{
                  display: "block",
                  background: "#FBFBFB",
                  padding: "15px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BiServer color="red" style={{ marginRight: "10px" }} />
                  <p style={{ fontWeight: "600" }}>Host</p>
                </div>
                <p
                  style={{
                    color: "grey",
                    marginLeft: "26px",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  https://mqtt.coolopt.io
                </p>
              </div>
              <div
                style={{
                  display: "block",
                  padding: "15px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AiOutlineApi color="red" style={{ marginRight: "10px" }} />
                  <p style={{ fontWeight: "600" }}>Port</p>
                </div>
                <p
                  style={{
                    color: "grey",
                    marginLeft: "26px",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  8883
                </p>
              </div>
              <div
                style={{
                  display: "block",
                  background: "#FBFBFB",
                  padding: "15px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AiOutlineCode color="red" style={{ marginRight: "10px" }} />
                  <p style={{ fontWeight: "600" }}>Client ID</p>
                </div>
                <p
                  style={{
                    color: "grey",
                    marginLeft: "26px",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  coolopt-client-1928-43fs
                </p>
              </div>
              <div
                style={{
                  display: "block",
                  padding: "15px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IoIosFingerPrint
                    color="red"
                    style={{ marginRight: "10px" }}
                  />
                  <p style={{ fontWeight: "600" }}>Authentication</p>
                </div>
                <p
                  style={{
                    color: "grey",
                    marginLeft: "26px",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Logged in
                </p>
              </div>
            </CardContent>
            <CardActions style={{ margin: 0, padding: 0 }}>
              <Button
                onClick={handleMqttConfigDialogOpen}
                style={{
                  background: "#09beb8",
                  color: "white",
                  textTransform: "none",
                  margin: "18px",
                }}
              >
                Edit configuration
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={5} lg={5}>
          <Card
            style={{
              borderRadius: "0px",
              height: "100%",
            }}
          >
            <CardHeader
              title="Topic subscriptions"
              titleTypographyProps={{ variant: "h6" }}
              style={{ background: "black", color: "white" }}
            />
            <Divider style={{ background: "grey", height: "2px" }} />
            <CardContent style={{ margin: 0, padding: 0 }}>
              <CardActions style={{ margin: 0, padding: 0 }}>
                <Button
                  onClick={handleMqttTopicDialogOpen}
                  style={{
                    background: "#09beb8",
                    color: "white",
                    textTransform: "none",
                    margin: "18px",
                  }}
                >
                  Add new topic subscription
                </Button>
              </CardActions>
              <Divider style={{ background: "#e3e3e3", height: "2px" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "block",
                    padding: "5px 15px 5px 15px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <WiCloudUp
                      fontSize="25px"
                      color="#0B627F"
                      style={{ marginRight: "10px" }}
                    />
                    <p style={{ fontWeight: "400" }}>sensors/temp-hum/tts5</p>
                  </div>
                  <p
                    style={{
                      color: "grey",
                      marginLeft: "35px",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    QoS 1
                  </p>
                </div>
                <div style={{ margin: "10px" }}>
                  <p
                    style={{
                      color: "#cc4b00",
                      paddingLeft: "10px",
                      fontWeight: "600",
                      fontSize: "14px",
                      textAlign: "center",
                      display: "table-cell",
                      verticalAlign: "middle",
                    }}
                  >
                    1 Connection
                  </p>
                </div>
              </div>

              <Divider style={{ background: "#e3e3e3", height: "2px" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "block",
                    padding: "5px 15px 5px 15px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <WiCloudUp
                      fontSize="25px"
                      color="#0B627F"
                      style={{ marginRight: "10px" }}
                    />
                    <p style={{ fontWeight: "400" }}>
                      sensors/temp-hum/unm/block-b/ground-floor
                    </p>
                  </div>
                  <p
                    style={{
                      color: "grey",
                      marginLeft: "35px",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    QoS 1
                  </p>
                </div>
                <div style={{ margin: "10px" }}>
                  <p
                    style={{
                      color: "#cc4b00",
                      paddingLeft: "10px",
                      fontWeight: "600",
                      fontSize: "14px",
                      textAlign: "center",
                      display: "table-cell",
                      verticalAlign: "middle",
                    }}
                  >
                    125 Connections
                  </p>
                </div>
              </div>
              <Divider style={{ background: "#e3e3e3", height: "2px" }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Card
            style={{
              borderRadius: "0px",
              height: "100%",
            }}
          >
            <CardHeader
              title="Topic testing"
              titleTypographyProps={{ variant: "h6" }}
              style={{ background: "black", color: "white" }}
            />
            <Divider style={{ background: "grey", height: "2px" }} />
            <CardContent>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <label
                  style={{
                    width: "100%",
                    margin: "10px 0",
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: 1,
                  }}
                >
                  Choose a topic to subscribe and publish a test message
                </label>
                <DropdownButton
                  id="difficulty"
                  options={props.difficultyOptions}
                  value={props.difficulty}
                  onChange={props.onChangeDifficulty}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <label
                  style={{
                    width: "100%",
                    margin: "10px 0",
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: 1,
                  }}
                >
                  Message to publish
                </label>
                <InputBase
                  id="password"
                  classes={inputStyles}
                  type="text"
                  autoComplete="off"
                  defaultValue={props.password}
                  onChange={props.onChangePassword}
                  style={{
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
                  }}
                  error={props.passwordError}
                  onBlur={props.onBlur}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {props.passwordHelperText}
                </p>
              </Grid>
            </CardContent>
            <CardActions style={{ margin: 0, padding: 0 }}>
              <Button
                // onClick={handleMqttConfigDialogOpen}
                style={{
                  background: "#09beb8",
                  color: "white",
                  textTransform: "none",
                  margin: "0px 18px 18px 18px",
                }}
              >
                Publish test message
              </Button>
            </CardActions>
            <CardContent>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <label
                  style={{
                    width: "100%",
                    margin: "10px 0",
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: 1,
                  }}
                >
                  Response Message from broker
                </label>
                <textarea
                  id="description"
                  value={props.description}
                  placeholder=""
                  onChange={props.onChangeDescription}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    minWidth: "100%",
                    height: "50px",
                    minHeight: "50px",
                    maxHeight: "100px",
                    border: "none",
                    outline: "none",
                    fontSize: "12px",
                    padding: "10px",
                    background: "rgb(243,243,243)",
                    color: "grey",
                    letterSpacing: "1px",
                    marginTop: "2px",
                    marginBottom: "10px",
                  }}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card
            style={{
              borderRadius: "0px",
              height: "100%",
            }}
          >
            <CardHeader
              title="Client connection Summary"
              titleTypographyProps={{ variant: "h6" }}
              style={{ background: "black", color: "white" }}
            />
            <Divider style={{ background: "grey", height: "2px" }} />
            <CardContent>
              <p
                style={{
                  color: "black",
                  paddingLeft: "10px",
                  fontWeight: "600",
                  fontSize: "14px",
                  textAlign: "center",
                  display: "table-cell",
                  verticalAlign: "middle",
                }}
              >
                126 clients are connected to the broker
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <CustomDialog
        title="MQTT connection configuration"
        dialogOpen={mqttConfigDialogOpen}
        handleDialogClose={handleMqttConfigDialogClose}
        actionButtonLabel="Connect"
        actionButtonClickHandler={formik.handleSubmit}
        dialogActionBtnLoading={false}
        actionBtnLoadingMsg={<BeatLoader loading={false} size={5} />}
      >
        <MqttConfig
          // typed inputs
          onChangeTitle={formik.handleChange}
          onChangeDescription={formik.handleChange}
          onChangeDate={formik.handleChange}
          // Error handling //
          // ...check if fields have been touched before throwing error
          titleError={formik.touched.title && Boolean(formik.errors.title)}
          descriptionError={
            formik.touched.description && Boolean(formik.errors.description)
          }
          dateError={formik.touched.date && Boolean(formik.errors.date)}
          // ...helperTexts(error messages)
          titleHelperText={formik.touched.title && formik.errors.title}
          descriptionHelperText={
            formik.touched.description && formik.errors.description
          }
          dateHelperText={formik.touched.date && formik.errors.date}
          // ...onBlur prop to show errors more immediately
          onBlur={formik.handleBlur}
        />
      </CustomDialog>
      <CustomDialog
        title="MQTT topic subscription configuration"
        dialogOpen={mqttTopicDialogOpen}
        handleDialogClose={handleMqttTopicDialogClose}
        actionButtonLabel="Add topic"
        actionButtonClickHandler={formik.handleSubmit}
        dialogActionBtnLoading={false}
        actionBtnLoadingMsg={<BeatLoader loading={false} size={5} />}
      >
        <MqttTopic
          // typed inputs
          onChangeTitle={formik.handleChange}
          onChangeDescription={formik.handleChange}
          onChangeDate={formik.handleChange}
          // Error handling //
          // ...check if fields have been touched before throwing error
          titleError={formik.touched.title && Boolean(formik.errors.title)}
          descriptionError={
            formik.touched.description && Boolean(formik.errors.description)
          }
          dateError={formik.touched.date && Boolean(formik.errors.date)}
          // ...helperTexts(error messages)
          titleHelperText={formik.touched.title && formik.errors.title}
          descriptionHelperText={
            formik.touched.description && formik.errors.description
          }
          dateHelperText={formik.touched.date && formik.errors.date}
          // ...onBlur prop to show errors more immediately
          onBlur={formik.handleBlur}
        />
      </CustomDialog>
    </div>
  );
}
