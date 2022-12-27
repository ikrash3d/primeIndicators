import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import Signup from "../../components/signup/Signup";
import Login from "../../components/login/Login";
import Layout from "../../components/layout/Layout";
import ForgotPassword from "../../components/forgot-password/ForgotPassword";

const LoginPage = () => {
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const toggleForm = () => {
    setIsSignUpForm(!isSignUpForm);
    setIsForgotPassword(false);
  };

  const backToLoginForm = () => {
    setIsSignUpForm(false);
    setIsForgotPassword(false);
  };

  const toggleForgotPassword = () => {
    setIsSignUpForm(false);
    setIsForgotPassword(true);
  };

  return (
    <Layout>
      {isSignUpForm && !isForgotPassword && (
        <div className={styles.container}>
          <Signup></Signup>
          <p>
            Already have an account? <a onClick={toggleForm}>Log in</a>
          </p>
        </div>
      )}
      {!isSignUpForm && !isForgotPassword && (
        <div className={styles.container}>
          <h3>It appears that you're not logged in</h3>
          <Login></Login>
          <p className={styles.forgotPassword} onClick={toggleForgotPassword}>
            Forgot your password?
          </p>
          <p>
            Don't have an account? <a onClick={toggleForm}>Sign up</a>
          </p>
        </div>
      )}
      {!isSignUpForm && isForgotPassword && (
        <div className={styles.container}>
          <ForgotPassword></ForgotPassword>
          <p className={styles.forgotPassword} onClick={backToLoginForm}>
            Back to login
          </p>
        </div>
      )}
    </Layout>
  );
};

export default LoginPage;
