import React from "react";
import ReactDOM from "react-dom";
import { Flow } from "../Flow/Flow";

// explicitly read any global variables from window
const Autodesk = window.Autodesk;

export class PipelinePanel extends Autodesk.Viewing.UI.DockingPanel {
  constructor(viewer, container, id, title, options) {
    super(container, id, title, options);
    this.viewer = viewer;
  }

  initialize() {
    this.container.style.top = "10px";
    this.container.style.left = "10px";
    this.container.style.width = "auto";
    this.container.style.height = "auto";
    this.container.style.resize = "none";

    // title bar
    this.titleBar = this.createTitleBar(this.titleLabel || this.container.id);
    this.container.appendChild(this.titleBar);

    // close button
    this.closeButton = this.createCloseButton();
    this.container.appendChild(this.closeButton);

    // allow move
    this.initializeMoveHandlers(this.container);

    // footer
    this.container.appendChild(this.createFooter());

    // this is where we should place the content of our panel
    this.div = document.createElement("div");
    this.container.appendChild(this.div);
    // and may also append child elements...
  }

  setVisible(show) {
    super.setVisible(show);

    if (show) {
      this.reactNode = ReactDOM.render(
        <div
          style={{
            height: "400px",
            width: "600px",
            padding: "10px",
            color: "black",
          }}
        >
          <Flow />
        </div>,
        this.div
      );
    } else if (this.reactNode) {
      ReactDOM.unmountComponentAtNode(this.div);

      this.reactNode = null;
    }
  }
}
