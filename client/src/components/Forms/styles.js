import {
    grayColor,
    hexToRgb,
    blackColor,
  } from "../../assets/jss/universalStyle";
  
  const styles = (theme) => ({
    root: {
      boxShadow: "none",
      background: "linear-gradient(90deg, #604a9f 10%, #ff903e 80%)",
      borderRadius: "10px",
      padding: "1px", //increase the thickness of the gradient border from here
      maxWidth: 200,
      textAlign: "center",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    questionInput: {
      width: "100%",
      border: "none",
      outline: "none",
      fontSize: "12px",
      padding: "10px",
      background: "rgb(243,243,243)",
      color: "black",
      letterSpacing: "1px",
      marginTop: "2px",
      marginBottom: "10px",
      "&:focus": {
        border: "2px solid #ff8900",
      },
    },
    button: {
      display: "flex",
      padding: "25px",
      minWidth: 180,
      maxWidth: 180,
      height: 230,
      color: "#7e57c2",
      fontSize: "15px",
      background: "#111b29",
      border: "1px solid #7e57c2",
      borderRadius: "20px",
      transition: "200ms",
      "&:hover": {
        transform: "translate(0, -4px)",
        background: "#0d1321",
        // border: "1px solid #444f62",
        boxShadow: " 0px 0px 10px 2px rgba(126,87,194,0.4)",
      },
      textTransform: "none",
    },
    thingToCreate: {
      color: "#ffffff",
      marginTop: "5px",
      marginBottom: "5px",
      // background: "-webkit-linear-gradient(45deg, #604a9f 20%, #ff903e 80%)",
      // "-webkit-background-clip": "text",
      // "-webkit-text-fill-color": "transparent",
    },
    centeredDivContainer: {
      // display: "flex",
      width: "80%",
      position: "fixed",
      top: "35%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "40px",
    },
  
    centeredDivContainer1: {
      // display: "flex",
      width: "80%",
      position: "fixed",
      top: "70%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "40px",
    },
  
    contentGrid: {
      display: "grid",
      justifyContent: "center",
      "grid-template-columns": "repeat(auto-fill, 200px)",
      gridGap: "50px",
    },
  
    splitBtnGrid: {
      display: "grid",
      "grid-template-columns": "repeat(auto-fill, 127px)",
      gridGap: "10px",
    },
  
    addIcon: {
      padding: "4px",
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "inline",
      alignItems: "center",
      justifyContent: "center",
      color: "#ff903e",
    },
  
    errorMsg: {
      color: "red",
      fontSize: "12px",
    },
  
    btnContainer: {
      width: "150px",
      color: "white",
      fontWeight: "600",
      background: "#ff5e00",
      transition: "all 0.2s ease",
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
      width: "150px",
      color: "white",
      fontWeight: "600",
      background: "#e0e0e0",
      transition: "all 0.2s ease",
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
    actionsContainer: {
      marginBottom: theme.spacing(2),
      justifyContent: "flex-end",
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    largeInput: {
      width: "100%",
      maxWidth: "100%",
      minWidth: "100%",
      height: "100px",
      minHeight: "100px",
      maxHeight: "100px",
      border: "none",
      outline: "none",
      fontSize: "12px",
      padding: "10px",
      background: "rgb(243,243,243)",
      color: "grey",
      letterSpacing: "1px",
      marginTop: "2px",
      marginBottom: "10px",
    },
  
    customContainer: {
      width: "100%",
      height: "150px",
      border: "1px solid rgb(243,243,243)",
      outline: "none",
      fontSize: "12px",
      color: "grey",
      letterSpacing: "1px",
      marginTop: "10px",
      marginBottom: "10px",
      overflowY: "auto",
    },
  
    // for ripple animation on submit edits button for lesson objectives
    checkCircleIcon: {
      animation: "$ripple 1.2s infinite ease-in-out",
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "50%": {
        transform: "scale(1.0)",
        opacity: 0.5,
      },
      "100%": {
        transform: "scale(.8)",
        opacity: 1,
      },
    },
  
    input: {
      width: "100%",
      border: "none",
      outline: "none",
      fontSize: "12px",
      // padding: "10px",
      background: "rgb(243,243,243)",
      color: "black",
      letterSpacing: "1px",
      marginTop: "2px",
      marginBottom: "5px",
    },
  
    enrollmentCodeInput: {
      width: "135px",
      border: "3px solid #e9e9e9",
      outline: "none",
      fontSize: "12px",
      // padding: "10px",
      background: "rgb(243,243,243)",
      color: "black",
      letterSpacing: "1px",
      marginTop: "2px",
      marginBottom: "5px",
    },
  
    enrollmentCodeCreator: {
      width: "50px",
      height: "40px",
      background: "grey",
      marginLeft: "10px",
      textTransform: "none",
      "&:hover": {
        background: "black",
      },
    },
  
    availabilityCheckBtn: {
      width: "180px",
      color: "white",
      textTransform: "none",
      borderRadius: "8px",
      background: "#9c27b0",
      fontWeight: "600",
      "&:hover": {
        background: "#6a0080",
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
  
    availabilityCheckBtnLoading: {
      width: "180px",
      color: "white",
      textTransform: "none",
      borderRadius: "8px",
      background: "#e0e0e0",
      fontWeight: "600",
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
  
    inputLabel: {
      width: "100%",
      margin: "10px 0",
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: 1,
    },
    inputLabelSecondary: {
      width: "100%",
      margin: "10px 0",
      display: "block",
      fontSize: "12px",
      fontStyle: "italic",
      fontWeight: "300",
      lineHeight: 1.5,
    },
    dateFormContainer: {
      display: "flex",
      flexWrap: "wrap",
    },
    later: {
      fontSize: "11px",
    },
    link: {
      textDecoration: "none",
      fontSize: "12px",
      color: "black",
      "&:hover": {
        color: "#ff5e00",
      },
    },
  
  });
  
  export default styles;
  