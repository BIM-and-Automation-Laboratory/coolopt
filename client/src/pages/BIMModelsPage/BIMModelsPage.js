import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Sparql from "../../components/SPARQL/Sparql";
import { Flow } from "../../components/Flow/Flow";

const useStyles = makeStyles((theme) => ({
  bimViewerForgediv: {
    border: "solid rgb(220,220,220)",
    width: "40%",
    height: "85%",
    position: "fixed",
    right: "5px",
  },
}));

function BIMModelsPage(props) {
  const classes = useStyles();

  const [urnFromChild, setUrnFromChild] = useState(
    "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6cG9jX21vZGVsc19idWNrZXQvTWVkaWNhbF9GYWNpbGl0eV9BdXRvZGVza19DT2JpZS5ydnQ"
  );
  const [sparqlData, setSparqlData] = useState();
  const [allDbIds, setAllDbIds] = useState([]);

  const childFn = (urn) => {
    setUrnFromChild(urn);
  };

  const sparqlDataFn = (sparqlData) => {
    setSparqlData(sparqlData);
  };

  const idsToSelect =
    sparqlData?.results?.bindings?.map((row) => {
      return row.diffuser.value.replace(
        "https://example.com/fault-detection-graph#",
        ""
      );
    }) || [];

  console.log(idsToSelect);

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

      viewer.addEventListener(
        Autodesk.Viewing.SELECTION_CHANGED_EVENT,
        function () {
          viewer.model.getExternalIdMapping((data) => {
            const finalSelection = [];
            idsToSelect.map((id) => {
              if (id in data) {
                finalSelection.push(data[id]);
              }
            });
            console.log(finalSelection);
            viewer.isolate(finalSelection);
          });
          // const finalSelection = allDbIds.filter((dbId) => {
          //   viewer.getProperties(
          //     dbId,
          //     (props) => {
          //       if (idsToSelect.some((id) => id === props.externalId)) {
          //         return dbId;
          //       }
          //     },
          //     console.error
          //   );
          // });
          // const selectedIds = viewer.getSelection();
          // if (selectedIds.length === 1) {
          //   viewer.getProperties(
          //     selectedIds[0],
          //     function onSuccess(props) {
          //       console.log(props.externalId); // see if the "external ID" extracted by Forge contains the GUID you're looking for
          //       console.log(props.props); // or if the GUID is included somewhere in the properties
          //     },
          //     function onError(err) {
          //       console.error(err);
          //     }
          //   );
          // }
        }
      );

      // viewer.select(idsToSelect);

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={7} lg={7}>
        <Flow childFn={childFn} />
        <Sparql sparqlDataFn={sparqlDataFn} />
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <div className={classes.bimViewerForgediv} id="viewerContainer"></div>
      </Grid>
    </Grid>
  );
}

export default BIMModelsPage;
