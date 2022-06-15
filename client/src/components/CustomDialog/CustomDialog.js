import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import style from "./customDialogStyle";
import CloseIcon from "@material-ui/icons/Close";
import { AiFillCloseCircle } from "react-icons/ai";

const useStyles = makeStyles(style);

const StyledTooltip = withStyles({
  tooltipPlacementTop: {
    margin: "0",
  },
})(Tooltip);

const CustomDialog = ({
  maxHeight,
  minHeight,
  minWidth,
  maxWidth,
  fullScreen,
  children,
  title,
  subtitle,
  dialogOpen,
  handleDialogClose,
  handleTogglePreviewIcon,
  handleToggleView,
  actionButtonLabel,
  actionButtonClickHandler,
  dialogActionBtnLoading,
  actionBtnLoadingMsg,
  TransitionComponent,
  backgroundColor,
  titleBackgroundColor,
  titleColor,
  footerBackground,
  builder,
  iconButtonStyles,
}) => {
  const classes = useStyles({ maxHeight, minHeight, minWidth, maxWidth });
  const studentView = () => {
    if (builder) {
      return (
        <StyledTooltip title="Student View" placement="top" arrow>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleToggleView}
            aria-label="close"
            size="small"
            style={{ margin: "10px", width: "30px" }}
            className={iconButtonStyles}
          >
            {handleTogglePreviewIcon()}
          </IconButton>
        </StyledTooltip>
      );
    }
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={dialogOpen}
      onClose={handleDialogClose}
      scroll="paper"
      TransitionComponent={TransitionComponent}
      classes={{ paper: classes.dialogPaper }}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      // BUG FIX !!!! line below prevents the dialog from
      // restoring focus to previously focused element
      // which is the quick access dialog in our case
      disableRestoreFocus={true}
    >
      <AppBar
        style={{
          position: "relative",
          zIndex: "2000",
          backgroundColor: "white",
        }}
      >
        <Toolbar
          disableGutters
          style={{
            // backgroundImage: "linear-gradient(to right, #09beb8, #0d0646 80% )",
            color: "black",
            boxShadow: "0px",
            minHeight: "20px",
          }}
        >
          <Typography
            component="span"
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            {title}
            <p style={{ fontSize: "10px" }}> {subtitle} </p>
          </Typography>
          {studentView()}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDialogClose}
            aria-label="close"
            size="small"
            style={{ margin: "10px", width: "30px" }}
            className={iconButtonStyles}
          >
            <AiFillCloseCircle size={25} style={{ color: "#AD231F" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent
        dividers={true}
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </DialogContent>
      <DialogActions style={{ backgroundColor: footerBackground }}>
        <div
          className={
            dialogActionBtnLoading
              ? classes.btnContainerLoading
              : classes.btnContainer
          }
        >
          <Button
            type="submit"
            disabled={dialogActionBtnLoading}
            onClick={actionButtonClickHandler} //handleCreateSubject
            style={{
              color: "white",
              fontWeight: "800",
              textTransform: "none",
              minWidth: "150px",
            }}
          >
            {dialogActionBtnLoading ? actionBtnLoadingMsg : actionButtonLabel}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
