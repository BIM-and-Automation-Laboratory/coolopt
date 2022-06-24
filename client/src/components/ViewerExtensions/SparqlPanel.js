import React from "react";
import ReactDOM from "react-dom";
import Sparql from "../SPARQL/Sparql";

// explicitly read any global variables from window
const Autodesk = window.Autodesk;

export class SparqlPanel extends Autodesk.Viewing.UI.DockingPanel {
  constructor(viewer, container, id, title, options) {
    super(container, id, title, options);
    this.viewer = viewer;
  }

  initialize() {
    this.container.style.top = "10px";
    this.container.style.left = "50%";
    this.container.style.width = "auto";
    this.container.style.height = "auto";
    this.container.style.resize = "auto";

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
            maxwidth: "600px",
            padding: "10px",
            color: "black",
          }}
        >
          <Sparql sparqlDataFn={this.sparqlDataFn} />
        </div>,
        this.div
      );
    } else if (this.reactNode) {
      ReactDOM.unmountComponentAtNode(this.div);

      this.reactNode = null;
    }
  }

  // we use an arrow function to preserve context of 'this'
  // to the class otherwise 'this' would be in context of this
  // function
  sparqlDataFn = async (sparqlData) => {
    const idsToSelect =
      (await sparqlData?.results?.bindings?.map((row) => {
        return row.diffuser.value.replace(
          "https://example.com/fault-detection-graph#",
          ""
        );
      })) || [];

    await this.viewer.model.getExternalIdMapping((data) => {
      const finalSelection = [];
      idsToSelect.map((id) => {
        if (id in data) {
          finalSelection.push(data[id]);
        }
      });
      console.log(idsToSelect);
      this.viewer.select(finalSelection);
      this.viewer.fitToView(finalSelection);
    });
  };
}
