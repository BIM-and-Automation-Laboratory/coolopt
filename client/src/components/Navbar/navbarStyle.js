import { fade } from "@material-ui/core/styles";

import {
  container,
  drawerWidth,
  defaultFont,
  grayColor,
  hexToRgb,
  whiteColor,
  navBarHeight,
} from "../../assets/jss/universalStyle";

const navbarStyle = (theme) => ({
  appBar: {
    backgroundImage: "linear-gradient(to right, #09beb8 , #0d0646)",
    borderBottom: "0",
    marginBottom: "0px",
    position: "fixed",
    padding: "2px",
    zIndex: theme.zIndex.drawer + 1,
    color: grayColor[3],
    border: "0",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    minHeight: `${navBarHeight}`,
    display: "block",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  container: {
    ...container,
    minHeight: `${navBarHeight}`,
    paddingRight: "5px",
    paddingLeft: "5px",
  },
  flex: {
    flexGrow: 1,
  },
  logoLink: {
    ...defaultFont,
    textTransform: "uppercase",
    // padding: "5px 0",
    // display: "block",
    fontSize: "18px",
    textAlign: "left",
    fontWeight: "400",
    // lineHeight: "30px",
    textDecoration: "none",
    backgroundColor: "transparent",
    "&,&:hover": {
      color: whiteColor,
    },
  },
  logoImg: {
    position: "relative",
    top: "4px",
    width: "70px",
  },
  day: {
    letterSpacing: "unset",
    lineHeight: "40px",
    fontWeight: "700",
    fontSize: "25px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    background: "-webkit-linear-gradient(0deg, #ff903e 2%, #ff903e 20%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    "&:hover,&:focus": {
      background: "-webkit-linear-gradient(0deg, #ff903e 2%, #ff903e 20%)",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.8),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#7e57c2",
  },
  inputRoot: {
    color: grayColor[3],
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
        backgroundColor: fade(theme.palette.common.white, 1),
      },
    },
  },
  date: {
    ...defaultFont,
    letterSpacing: "unset",
    lineHeight: "10px",
    fontSize: "15px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    marginLeft: "2px",
    "&:hover,&:focus": {
      background: "transparent",
    },
  },
  appResponsive: {
    top: "8px",
  },
});

export default navbarStyle;
