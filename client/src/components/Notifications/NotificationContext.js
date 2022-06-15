import React, { useState, useRef, createContext } from "react";
import Notification from "./Notification";

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [messageData, setMessageData] = useState(undefined);
  const queueRef = useRef([]);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      // To make sure that the notification stays on
      // the page no matter if we click somewhere else
      return;
    }
    setOpen(false);
  }

  function processQueue() {
    if (queueRef.current.length > 0) {
      setMessageData(queueRef.current.shift());
      setOpen(true);
    }
  }

  function handleExited() {
    processQueue();
  }

  // This should take the shape of an object
  // with two keys, message and status
  function createNotification(notification) {
    queueRef.current.push(notification);

    if (open) {
      // If it is already open, close it, calls handleExited.
      setOpen(false);
    } else {
      // If not opened already, process your notification.
      processQueue();
    }
  }

  return (
    <NotificationContext.Provider value={{ createNotification }}>
      {children}
      <Notification
        {...messageData}
        open={open}
        handleClose={handleClose}
        handleExited={handleExited}
      />
    </NotificationContext.Provider>
  );
}
