import React from "react";
import styles from "./SignupPageModule.css";
import Signup from "../../components/signup/Signup";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const toggleLoginPage = () => {
    navigate("/login-page");
  };

  return (
    <Layout>
      <Signup></Signup>
      <p>
        Already have an account? <a onClick={toggleLoginPage}>Log in</a>
      </p>
    </Layout>
  );
};

export default SignupPage;
