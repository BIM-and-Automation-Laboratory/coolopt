import React from "react";

// UNFINISHED FILE

export default function mqtt() {
  return (
    <div>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <label className={classes.inputLabel}>Choose a BIM model</label>
        <SplitButton
          id="type"
          options={props.typeOptions}
          value={props.type}
          onChange={props.onChangeType}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <label className={classes.inputLabel}>MQTT Host</label>
        <InputBase
          id="mqttHost"
          classes={inputStyles}
          type="text"
          autoFocus
          autoComplete="off"
          defaultValue={props.mqttHost}
          onChange={props.onChangeMqttHost}
          className={classes.input}
          error={props.mqttHostError}
          onBlur={props.onBlur}
        />
        <p className={classes.errorMsg}>{props.mqttHostHelperText}</p>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <label className={classes.inputLabel}>MQTT Port</label>
          <InputBase
            id="mqttPort"
            classes={inputStyles}
            type="text"
            autoComplete="off"
            defaultValue={props.mqttPort}
            onChange={props.onChangeMqttPort}
            className={classes.input}
            error={props.mqttPortError}
            onBlur={props.onBlur}
          />
          <p className={classes.errorMsg}>{props.mqttPortHelperText}</p>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <label className={classes.inputLabel}>MQTT Client Id</label>
          <InputBase
            id="mqttClientId"
            classes={inputStyles}
            type="text"
            autoComplete="off"
            defaultValue={props.mqttClientId}
            onChange={props.onChangeMqttClientId}
            className={classes.input}
            error={props.mqttClientIdError}
            onBlur={props.onBlur}
          />
          <p className={classes.errorMsg}>{props.mqttClientIdHelperText}</p>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <label className={classes.inputLabel}>MQTT Username</label>
          <InputBase
            id="mqttUsername"
            classes={inputStyles}
            type="text"
            autoComplete="off"
            defaultValue={props.mqttUsername}
            onChange={props.onChangeMqttUsername}
            className={classes.input}
            error={props.mqttUsernameError}
            onBlur={props.onBlur}
          />
          <p className={classes.errorMsg}>{props.mqttUsernameHelperText}</p>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <label className={classes.inputLabel}>MQTT Password</label>
          <InputBase
            id="mqttPassword"
            classes={inputStyles}
            type="text"
            autoComplete="off"
            defaultValue={props.mqttPassword}
            onChange={props.onChangeMqttPassword}
            className={classes.input}
            error={props.mqttPasswordError}
            onBlur={props.onBlur}
          />
          <p className={classes.errorMsg}>{props.mqttPasswordHelperText}</p>
        </Grid>
      </Grid>
    </div>
  );
}
