import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  InputBase,
  Button,
  Card,
} from "@material-ui/core";
import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RemoveIcon from "@material-ui/icons/Remove";
import EditIcon from "@material-ui/icons/Edit";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useShadeInputBaseStyles } from "@mui-treasury/styles/inputBase/shade";
import styles from "./styles";
import SplitButton from "../DropdownButton/DropdownButton";
import Toggle from "../Toggle/Toggle";
import Upload from "../FileUpload/Upload";
import StagedFileList from "../FileUpload/StagedFileList";
import { GoSettings } from "react-icons/go";
import { BsInfoSquareFill } from "react-icons/bs";
import { IoIosFingerPrint } from "react-icons/io";
import { BiServer } from "react-icons/bi";
import { GiWalkieTalkie } from "react-icons/gi";

const useStyles = makeStyles(styles);

export default function MqttTopic(props) {
  const classes = useStyles();
  const inputStyles = useShadeInputBaseStyles();

  return (
    <div>
      <div>
        <Grid container spacing={2}>
          <Grid style={{ paddingLeft: 0 }} item xs={12} sm={12} md={12} lg={12}>
            <Card
              style={{
                display: "flex",
                borderLeft: "3px solid #09beb8",
                padding: "10px",
              }}
            >
              <GiWalkieTalkie
                style={{ marginRight: "10px" }}
                fontSize="15px"
                color="#09beb8"
              />
              <p style={{ fontSize: "12px", color: "grey" }}>Topics will be used for client subscriptions and publications</p>
            </Card>
          </Grid>
          <Grid style={{ marginBottom: "20px" }} container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <label className={classes.inputLabel}>Topic *</label>
              <InputBase
                id="topic"
                classes={inputStyles}
                type="text"
                autoFocus
                autoComplete="off"
                defaultValue={props.topic}
                onChange={props.onChangeTopic}
                className={classes.input}
                error={props.topicError}
                onBlur={props.onBlur}
              />
              <p className={classes.errorMsg}>{props.topicHelperText}</p>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <label className={classes.inputLabel}>
                Qos (Quality of Service) *
              </label>
              <InputBase
                id="qos"
                classes={inputStyles}
                type="text"
                autoComplete="off"
                defaultValue={props.qos}
                onChange={props.onChangeQos}
                className={classes.input}
                error={props.qosError}
                onBlur={props.onBlur}
              />
              <p className={classes.errorMsg}>{props.qosHelperText}</p>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
