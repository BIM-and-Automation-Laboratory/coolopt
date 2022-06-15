import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  whiteColor,
  grayColor,
  hexToRgb,
  navBarHeight
} from "../../assets/jss/universalStyle";

const sidebarStyle = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    border: "none",
    ...boxShadow,
  },
  drawerOpen: {
    overflowX: "hidden",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    border: "none",
    ...boxShadow,
    background: "#111122",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(6) + 1,
    },
    border: "none",
    ...boxShadow,
    background: "#111122",
    // this allows drawer to open temporarily on hover
    "@media (hover:hover)": {
      "&:hover": {
        width: drawerWidth,
        border: "none",
        ...boxShadow,
      },
    },
  },
  drawerPaper: {
    border: "none",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    zIndex: "1",
    ...boxShadow,
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "fixed",
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
      ...boxShadow,
      position: "fixed",
      display: "block",
      top: "0",
      height: "100vh",
      right: "0",
      left: "auto",
      zIndex: "1032",
      visibility: "visible",
      overflowY: "visible",
      borderTop: "none",
      textAlign: "left",
      paddingRight: "0px",
      paddingLeft: "0",
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition,
      background: "#111122",
    },
  },
  hide: {
    display: "none",
  },
  menuButton: {
    marginRight: 36,
    width: "500px",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  logo: {
    position: "relative",
    paddingLeft: "2px",
    paddingBottom: "60px",
    zIndex: "4",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "0",
      height: "1px",
      right: "15px",
      width: "calc(100% - 30px)",
      backgroundColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)",
    },
  },
  logoLink: {
    ...defaultFont,
    textTransform: "uppercase",
    padding: "5px 0",
    display: "block",
    fontSize: "18px",
    textAlign: "left",
    fontWeight: "400",
    lineHeight: "30px",
    textDecoration: "none",
    backgroundColor: "transparent",
    "&,&:hover": {
      color: whiteColor,
    },
  },
  logoImage: {
    width: "20px",
    display: "inline-block",
    maxHeight: "20px",
    margin: "auto",
  },
  img: {
    width: "40px",
    top: "20px",
    left: "5px",
    position: "absolute",
    verticalAlign: "middle",
    border: "0",
  },
  logoText: {
    fontSize: "20px",
    color: "white",
    position: "absolute",
    top: "25px",
    left: "60px",
  },
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset",
  },
  item: {
    position: "relative",
    display: "block",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      color: whiteColor,
    },
  },
  itemLink: {
    // width: "auto",
    transition: "all 300ms linear",
    // margin: "10px 15px 0",
    borderRadius: "1px",
    position: "relative",
    display: "block",
    padding: "5px 15px",
    backgroundColor: "transparent",
    ...defaultFont,
  },
  itemIcon: {
    lineHeight: "30px",
    float: "left",
    marginLeft: "-3px",
    marginRight: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.4)",
  },
  itemText: {
    margin: "0",
    lineHeight: "30px",
    fontSize: "13px",
    color: whiteColor,
    textTransform: "none",
  },

  whiteFont: {
    color: "white",
  },
  //CUSTOM COLOR FOR THE SIDEBAR BUTTONS
  blue: {
    backgroundImage: "linear-gradient(to right, #09beb8 , #0c1969)",
    "&:hover,&:focus": {
      backgroundImage: "linear-gradient(to right, #09beb8 , #0c1969)",
    },
  },
  sidebarWrapper: {
    position: "relative",
    height: "100vh",
    overflow: "auto",
    width: drawerWidth,
    zIndex: "4",
    overflowScrolling: "touch",
  },
});

export default sidebarStyle;
