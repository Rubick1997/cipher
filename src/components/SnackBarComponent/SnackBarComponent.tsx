import React, { useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import DataContext from "contexts/DataContext";

const SnackBarComponent = () => {
  const {
    snackBar: { open, setOpen, setMessage, message },
  } = useContext(DataContext);

  const handleCLose = () => {
    setOpen(false);
    setMessage("");
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleCLose}
      sx={{ height: "30%" }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity="error">
        {message.length > 0 ? message : "Oops error occured"}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComponent;
