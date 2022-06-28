import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../components/ViewerExtensions/ResearchExtension";
import { Grid } from "@material-ui/core";
import { ModelDataContext } from "../../components/ChooseModels/ModelDataContext";
import { viewerSetup } from "../../utils/forgeHelpers";
import { NotificationContext } from "../../components/Notifications/NotificationContext";

const useStyles = makeStyles((theme) => ({
  bimViewerForgediv: {
    border: "solid rgb(220,220,220)",
    width: "95%",
    height: "88%",
    position: "fixed",
  },
}));

function BIMModelsPage(props) {
  const classes = useStyles();

  const { viewableUrn } = useContext(ModelDataContext);

  const { createNotification } = useContext(NotificationContext);

  const urn = viewableUrn;
  useEffect(() => {
    viewerSetup(urn, createNotification);
  }, [viewableUrn]);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className={classes.bimViewerForgediv} id="viewerContainer"></div>
        </Grid>
      </Grid>
    </div>
  );
}

export default BIMModelsPage;
