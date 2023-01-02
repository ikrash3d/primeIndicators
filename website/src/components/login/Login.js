import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { TextField, Button, CircularProgress } from "@mui/material";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialLogInValue = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const logInSchema = Yup.object().shape({
    email: Yup.string().required("Please provide your email"),
    password: Yup.string().required("Please provide your password"),
  });

  const handleLogInSubmit = (values) => {
    setIsLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((response) => {
        sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
        setIsLoading(false);
        navigate("/account");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.code);
        if (error.code === "auth/wrong-password") {
          alert("Wrong password, please check the password");
        }
        if (error.code === "auth/user-not-found") {
          alert("User not found, please check the email");
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

            {!isLoading && (
              <Button type="submit" variant="contained" style={{ backgroundColor: "#168a53" }}>
                Log in
              </Button>
            )}
            {isLoading && <CircularProgress style={{ color: "#168a53" }}></CircularProgress>}
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
