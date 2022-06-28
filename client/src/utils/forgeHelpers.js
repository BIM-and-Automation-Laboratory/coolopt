/// import * as Autodesk from "@types/forge-viewer";

// explicitly read any global variables from window
const Autodesk = window.Autodesk;

async function getAccessToken(callback) {
  try {
    const resp = await fetch("/api/forge/auth/token");
    if (!resp.ok) {
      throw new Error(await resp.text());
    }
    const { access_token, expires_in } = await resp.json();
    callback(access_token, expires_in);
  } catch (err) {
    alert("Could not obtain access token. See the console for more details.");
    console.error(err);
  }
}

function initViewer(container) {
  return new Promise(function (resolve, reject) {
    Autodesk.Viewing.Initializer({ getAccessToken }, function () {
      const config = {
        extensions: ["Autodesk.DocumentBrowser", "ResearchExtension"],
      };
      const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
      viewer.start();
      viewer.setTheme("dark-theme");
      resolve(viewer);
    });
  });
}

function loadModel(viewer, urn) {
  return new Promise(function (resolve, reject) {
    function onDocumentLoadSuccess(doc) {
      resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()));
    }
    function onDocumentLoadFailure(code, message, errors) {
      reject({ code, message, errors });
    }
    viewer.setLightPreset(0);
    Autodesk.Viewing.Document.load(
      "urn:" + urn,
      onDocumentLoadSuccess,
      onDocumentLoadFailure
    );
  });
}

async function onModelSelected(viewer, urn, createNotification) {
  try {
    const resp = await fetch(`/api/forge/models/${urn}/status`);
    if (!resp.ok) {
      throw new Error(await resp.text());
    }
    const status = await resp.json();
    switch (status.status) {
      case "n/a":
        createNotification({
          message: `Model has not been translated.`,
          status: "info",
        });
        break;
      case "inprogress":
        createNotification({
          message: `Model is being translated (${status.progress})...`,
          status: "info",
        });
        break;
      case "failed":
        createNotification({
          message: `Translation failed. <ul>${status.messages
            .map((msg) => `<li>${JSON.stringify(msg)}</li>`)
            .join("")}</ul>`,
          status: "info",
        });
        break;
      default:
        loadModel(viewer, urn);
        break;
    }
  } catch (err) {
    createNotification({
      message: "Could not load model. See the console for more details.",
      status: "error",
    });
    console.error(err);
  }
}

export const viewerSetup = (urn, createNotification) => {
  initViewer(document.getElementById("viewerContainer")).then((viewer) => {
    onModelSelected(viewer, urn, createNotification);
  });
};
