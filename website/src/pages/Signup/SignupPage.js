import React, { useEffect, useState } from "react";
import styles from "./SignupPage.module.css";
import Signup from "../../components/signup/Signup";
import Layout from "../../components/layout/Layout";
import SignupSubscription from "../../components/signup-subscription/SignupSubscription";
import { Tabs, Tab, Button, Snackbar, Slide, SnackbarContent } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState(0);

  const [subscription, setSubscription] = useState({ id: "", price: "", terms: "" });

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackbarColor, setSnackbarColor] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const { subId, price, terms } = location.state;
    setSubscription({ id: subId, price: price, terms: terms });
    setValue(1);
  }, [location.state]);

  const handleSubscription = async (subscription) => {
    setSubscription({
      id: subscription.id,
      price: subscription.price,
      terms: subscription.terms,
    });
  };

  const toggleSignupForm = () => {
    if (subscription.id === "") {
      setSnackbarColor("red");
      setSnackbarMessage("You must choose a subscription before signing up");
      setSnackBarStatus(true);
      return;
    }
    setValue(1);
  };

  const handleCloseSnackbar = () => {
    setSnackBarStatus(false);
  };

  // const a11yProps = (index) => {
  //   return {
  //     id: `simple-tab-${index}`,
  //     "aria-controls": `simple-tabpanel-${index}`,
  //   };
  // };

  return (
    <Layout>
      <Tabs TabIndicatorProps={{ style: { background: "#168a53" } }} value={value} onChange={handleTabChange}>
        {/* <Tab label="Step 1" style={{ color: "#168a53" }} {...a11yProps(0)}></Tab>
        <Tab label="Step 2" disabled={false} style={{ color: "#168a53" }} {...a11yProps(1)}></Tab> */}
      </Tabs>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <SignupSubscription
          value={value}
          index={0}
          chooseSubscription={handleSubscription}
          subscriptionSelected={subscription}
        ></SignupSubscription>
        {value === 0 && (
          <div className={styles.actionButton}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#168a53", marginBottom: "20px", width: "150px" }}
              onClick={toggleSignupForm}
            >
              Confirm
            </Button>

            <Button
              variant="contained"
              className={styles.button}
              style={{ backgroundColor: "#168a53", marginBottom: "20px", width: "150px" }}
              onClick={() => navigate("/home")}
            >
              Go back home
            </Button>
          </div>
        )}
      </div>
      <Signup value={value} index={1} subscription={subscription}></Signup>
      {value === 1 && (
        // <Button
        //   variant="contained"
        //   style={{ backgroundColor: "#168a53", margin: "40px 0px 20px 0px", width: "150px" }}
        //   onClick={() => setValue(0)}
        // >
        //   Go back
        // </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#168a53", margin: "40px 0px 20px 0px", width: "150px" }}
          onClick={() => navigate("/home")}
        >
          Go back
        </Button>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBarStatus}
        TransitionComponent={Slide}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          style={{
            backgroundColor: snackbarColor,
            textAlign: "center",
          }}
          className={styles.snackbarContent}
          message={snackbarMessage}
        ></SnackbarContent>
      </Snackbar>
    </Layout>
  );
};

export default SignupPage;
