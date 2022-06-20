import React, { useEffect } from "react";
import Yasgui from "@triply/yasgui";
import "@triply/yasgui/build/yasgui.min.css";
import { Card } from "@material-ui/core";

export default function Sparql({ sparqlDataFn }) {
  useEffect(() => {
    const yasgui = new Yasgui(document.getElementById("yasgui"), {
      requestConfig: {
        endpoint:
          "https://api.triplydb.com/datasets/KevinLuwembaMugumya/medical/services/medical/sparql",
      },
      copyEndpointOnNewTab: false,
    });
    yasgui.on("queryResponse", (_, data) => {
      sparqlDataFn(data.yasr.results.json);
    });
    return () => {};
  }, []);

  return (
    <Card>
      <div id="yasgui" />
    </Card>
  );
}
