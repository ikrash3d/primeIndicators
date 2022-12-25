import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import Signup from "../../components/signup/Signup";
import Login from "../../components/login/Login";
import Layout from "../../components/layout/Layout";
import { Button } from "@mui/material";

const LoginPage = () => {
  const [isSignUpForm, setIsSignUpForm] = useState(false);

  const toggleForm = () => {
    setIsSignUpForm(!isSignUpForm);
  };

  return (
    <Layout>
      {isSignUpForm && (
        <div className={styles.container}>
          <Signup></Signup>
          <p>
            Already have an account? <Button onClick={toggleForm}>Log in</Button>
          </p>
        </div>
      )}
      {!isSignUpForm && (
        <div className={styles.container}>
          <Login></Login>
          <p>
            Don't have an account? <Button onClick={toggleForm}>Sign up</Button>
          </p>
        </div>
      )}
    </Layout>
  );
};

export default LoginPage;
