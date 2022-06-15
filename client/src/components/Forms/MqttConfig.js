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

const useStyles = makeStyles(styles);

export default function MqttConfig(props) {
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
              <BiServer
                style={{ marginRight: "10px" }}
                fontSize="15px"
                color="#09beb8"
              />
              <p style={{ fontSize: "12px", color: "grey" }}>Connection</p>
            </Card>
          </Grid>
          <Grid style={{ marginBottom: "20px" }} container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <label className={classes.inputLabel}>Host *</label>
              <InputBase
                id="host"
                classes={inputStyles}
                type="text"
                autoFocus
                autoComplete="off"
                defaultValue={props.host}
                onChange={props.onChangeHost}
                className={classes.input}
                error={props.hostError}
                onBlur={props.onBlur}
              />
              <p className={classes.errorMsg}>{props.hostHelperText}</p>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <label className={classes.inputLabel}>Port *</label>
              <InputBase
                id="port"
                classes={inputStyles}
                type="text"
                autoComplete="off"
                defaultValue={props.port}
                onChange={props.onChangePort}
                className={classes.input}
                error={props.portError}
                onBlur={props.onBlur}
              />
              <p className={classes.errorMsg}>{props.portHelperText}</p>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <label className={classes.inputLabel}>Client ID *</label>
              <InputBase
                id="clientId"
                classes={inputStyles}
                type="text"
                autoComplete="off"
                defaultValue={props.clientId}
                onChange={props.onChangeClientId}
                className={classes.input}
                error={props.clientIdError}
                onBlur={props.onBlur}
              />
              <p className={classes.errorMsg}>{props.clientIdHelperText}</p>
            </Grid>
          </Grid>

          <Grid style={{ paddingLeft: 0 }} item xs={12} sm={12} md={12} lg={12}>
            <Card
              style={{
                display: "flex",
                borderLeft: "3px solid #09beb8",
                padding: "10px",
              }}
            >
              <IoIosFingerPrint
                style={{ marginRight: "10px" }}
                fontSize="15px"
                color="#09beb8"
              />
              <p style={{ fontSize: "12px", color: "grey" }}>Authentication</p>
            </Card>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <label className={classes.inputLabel}>Username *</label>
              <InputBase
                id="username"
                classes={inputStyles}
                type="text"
                autoComplete="off"
                defaultValue={props.username}
                onChange={props.onChangeUsername}
                className={classes.input}
                error={props.usernameError}
                onBlur={props.onBlur}
              />
              <p className={classes.errorMsg}>{props.usernameHelperText}</p>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <label className={classes.inputLabel}>Password *</label>
              <InputBase
                id="password"
                classes={inputStyles}
                type="text"
                autoComplete="off"
                defaultValue={props.password}
                onChange={props.onChangePassword}
                className={classes.input}
                error={props.passwordError}
                onBlur={props.onBlur}
              />
              <p className={classes.errorMsg}>{props.passwordHelperText}</p>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
