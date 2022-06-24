import { PipelinePanel } from "./PipelinePanel";
import { SparqlPanel } from "./SparqlPanel";

// explicitly read any global variables from window
const Autodesk = window.Autodesk;

class ResearchExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this._group = null;
    this._pipelineButton = null;
    this._sparqlButton = null;
    this._pipelinePanel = null;
    this._sparqlPanel = null;
  }

  load() {
    console.log("Research Extension has been loaded");
    return true;
  }

  unload() {
    super.unload();
    // unload toolbar buttons
    for (const button of [this._pipelineButton, this._sparqlButton]) {
      this.removeToolbarButton(button);
    }
    this._pipelineButton = null;
    this._sparqlButton = null;

    // unload docked panels
    for (const panel of [this._pipelinePanel, this._sparqlPanel]) {
      panel.setVisible(false);
      panel.uninitialize();
    }
    this._pipelinePanel = null;
    this._sparqlPanel = null;

    // Clean our UI elements if we added any
    if (this._group) {
      this._group.removeControl(this._button);
      if (this._group.getNumberOfControls() === 0) {
        this.viewer.toolbar.removeControl(this._group);
      }
    }
    console.log("PipelineExtension has been unloaded");
    return true;
  }

  onToolbarCreated() {
    // create the pipeline panel
    this._pipelinePanel = new PipelinePanel(
      this.viewer,
      this.viewer.container,
      "PipelinePanel",
      "Research Pipeline"
    );

    // create the sparql panel
    this._sparqlPanel = new SparqlPanel(
      this.viewer,
      this.viewer.container,
      "SparqlPanel",
      "SPARQL Engine: Ask the BIM"
    );

    // Create a new toolbar group if it doesn't exist
    this._group = this.viewer.toolbar.getControl("ResearchExtensionsToolbar");
    if (!this._group) {
      this._group = new Autodesk.Viewing.UI.ControlGroup(
        "ResearchExtensionsToolbar"
      );
      this.viewer.toolbar.addControl(this._group);
    }

    // Add new buttons to the toolbar group
    this._pipelineButton = new Autodesk.Viewing.UI.Button(
      "PipelineExtensionButton"
    );
    this._sparqlButton = new Autodesk.Viewing.UI.Button(
      "SparqlExtensionButton"
    );

    // onclick handlers for the buttons
    this._pipelineButton.onClick = (ev) => {
      this._pipelinePanel.setVisible(!this._pipelinePanel.isVisible());
    };
    this._sparqlButton.onClick = (ev) => {
      this._sparqlPanel.setVisible(!this._sparqlPanel.isVisible());
    };

    this._pipelineButton.setToolTip("Explore Research Pipeline");
    this._pipelineButton.addClass("PipelineExtensionIcon");
    this._group.addControl(this._pipelineButton);

    this._sparqlButton.setToolTip("Open SPARQL Engine");
    this._sparqlButton.addClass("SparqlExtensionIcon");
    this._group.addControl(this._sparqlButton);
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  "ResearchExtension",
  ResearchExtension
);
