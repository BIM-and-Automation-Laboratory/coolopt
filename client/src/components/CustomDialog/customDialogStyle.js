import {
  grayColor,
  hexToRgb,
  blackColor,
} from "../../assets/jss/universalStyle";

const customDialogStyle = (theme) => ({
  dialogPaper: {
    // maxHeight: (props) => props.maxHeight || "80vh",
    // minHeight: (props) => props.minHeight || "85vh",
    minWidth: (props) => props.minWidth || "40vw",
    maxWidth: (props) => props.maxWidth,
    [theme.breakpoints.down("md")]: {
      maxHeight: "75vh",
    },
  },

  btnContainer: {
    color: "white",
    fontWeight: "600",
    background: "#09beb8",
    transition: "all 0.2s ease",
    borderRadius: "8px",
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.12)",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0px",
    "&:hover": {
      boxShadow:
        "0 10px 20px -10px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.2), 0 4px 10px 0px rgba(" +
        hexToRgb(blackColor) +
        ", 0.3), 0 8px 10px -5px rgba(" +
        hexToRgb(grayColor[0]) +
        ", 0.3)",
    },
  },

  btnContainerLoading: {
    color: "white",
    fontWeight: "600",
    background: "#e0e0e0",
    transition: "all 0.2s ease",
    borderRadius: "8px",
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.12)",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0px",
  },
});

export default customDialogStyle;
