import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../components/ViewerExtensions/ResearchExtension";

const useStyles = makeStyles((theme) => ({
  bimViewerForgediv: {
    border: "solid rgb(220,220,220)",
    width: "95%",
    height: "85%",
    position: "fixed",
  },
}));

function BIMModelsPage(props) {
  const classes = useStyles();

  const [urnFromChild, setUrnFromChild] = useState(
    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvTWVkaWNhbF9GYWNpbGl0eV9BdXRvZGVza19DT2JpZS5ydnQ"
  );

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
        extensions: ["ResearchExtension"],
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

  const urn = urnFromChild;
  useEffect(() => {
    initializeViewer(urn);
  }, [urnFromChild]);

  return <div className={classes.bimViewerForgediv} id="viewerContainer"></div>;
}

export default BIMModelsPage;
