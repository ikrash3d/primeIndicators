import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { TextField, Button, Snackbar, Slide, SnackbarContent } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleCloseSnackbar = () => {
    setSnackBarStatus(false);
  };

  const handleUserEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const handleResetPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        setSnackbarColor("rgb(67, 160, 71)");
        setSnackbarMessage("An email to reset your password was sent!");
        setSnackBarStatus(true);
      })
      .catch((e) => {
        setSnackbarColor("red");
        e.code === "auth/invalid-email"
          ? setSnackbarMessage("The email provided doesn't seem to exist")
          : setSnackbarMessage("An error occured. Please try again later.");
        setSnackBarStatus(true);
      });
  };

  return (
    <div className={styles.container}>
      <h4 style={{ textAlign: "center" }}>Please provide your email you signed up with</h4>
      <TextField fullWidth variant="outlined" value={userEmail} onChange={handleUserEmail}></TextField>
      <br></br>
      <Button type="submit" variant="contained" style={{ backgroundColor: "#168a53" }} onClick={handleResetPassword}>
        Forgot Password
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackBarStatus}
        TransitionComponent={Slide}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          style={{ backgroundColor: snackbarColor, justifyContent: "center" }}
          className={styles.snackbarContent}
          message={snackbarMessage}
        ></SnackbarContent>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
