import {
  drawerWidth,
  transition,
  container,
} from "../assets/jss/universalStyle";

const styles = (theme) => ({
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${57}px)`,
    },
    // overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainPanelShift: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    // width: "100%",
    overflowScrolling: "touch",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  content: {
    marginTop: "50px",
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingRight: "10px",
    paddingLeft: "10px",
  },
});

export default styles;
