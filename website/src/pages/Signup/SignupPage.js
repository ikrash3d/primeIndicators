import React, { useState } from "react";
import styles from "./SignupPageModule.css";
import Signup from "../../components/signup/Signup";
import Layout from "../../components/layout/Layout";
import SignupSubscription from "../../components/signup-subscription/SignupSubscription";
import { Tabs, Tab, Button } from "@mui/material";

const SignupPage = () => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Layout>
      <Tabs TabIndicatorProps={{ style: { background: "#168a53" } }} value={value} onChange={handleTabChange}>
        <Tab label="Step 1" style={{ color: "#168a53" }} {...a11yProps(0)}></Tab>
        <Tab label="Step 2" disabled={false} style={{ color: "#168a53" }} {...a11yProps(1)}></Tab>
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
        <SignupSubscription value={value} index={0}></SignupSubscription>
        {value === 0 && (
          <Button
            variant="contained"
            style={{ backgroundColor: "#168a53", marginBottom: "20px" }}
            onClick={() => setValue(1)}
          >
            Confirm
          </Button>
        )}
      </div>
      <Signup value={value} index={1}></Signup>
    </Layout>
  );
};

export default SignupPage;
