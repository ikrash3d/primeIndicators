import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signUpForm, setSignUpForm] = useState(true);
  const toggleSignUpForm = () => {
    setSignUpForm(!signUpForm);
  };

  const initialLogInValue = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const logInSchema = Yup.object().shape({
    email: Yup.string().required("Please provide your email"),
    password: Yup.string().required("Please provide your password"),
  });

  const handleLogInSubmit = (values, props) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((response) => {
        console.log("response", response);
        navigate("/home");
        sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/wrong-password") {
          console.log("Please check the Password");
        }
        if (error.code === "auth/user-not-found") {
          console.log("Please check the Email");
        }
      });
  };

  return (
    <Formik initialValues={initialLogInValue} validationSchema={logInSchema} onSubmit={handleLogInSubmit}>
      {(props) => {
        return (
          <Form className={styles.container}>
            <h1>Log in</h1>
            <Field
              as={TextField}
              label="Email"
              name="email"
              type="email"
              fullWidth
              variant="outlined"
              helperText={<ErrorMessage name="email"></ErrorMessage>}
              error={props.errors.email && props.touched.email}
            ></Field>
            <br></br>

            <Field
              as={TextField}
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
              helperText={<ErrorMessage name="password"></ErrorMessage>}
              error={props.errors.password && props.touched.password}
            ></Field>
            <br></br>

            <Button type="submit" variant="contained" style={{ backgroundColor: "#168a53" }}>
              Log in
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
