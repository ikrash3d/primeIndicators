import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import Login from "../../components/login/Login";
import Layout from "../../components/layout/Layout";
import ForgotPassword from "../../components/forgot-password/ForgotPassword";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const navigate = useNavigate();

  const toggleSignupPage = () => {
    navigate("/signup-page");
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
      {!isForgotPassword && (
        <div className={styles.container}>
          <h3>It appears that you're not logged in</h3>
          <Login></Login>
          <p className={styles.forgotPassword} onClick={toggleForgotPassword}>
            Forgot your password?
          </p>
          <p>
            Don't have an account? <a onClick={toggleSignupPage}>Sign up</a>
          </p>
        </div>
      )}
      {isForgotPassword && (
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
