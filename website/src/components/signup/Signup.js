import React from "react";
import { TextField, Button } from "@mui/material";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import styles from "./Signup.module.css";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const PASSWORD_REGEX = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

const Signup = () => {
  const initialSignUpValue = {
    firstName: "",
    lastName: "",
    tradingViewName: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const signUpSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("A first name is required"),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("A last name is required"),
    tradingViewName: Yup.string().required("Your TradingView username/email is required"),
    email: Yup.string().email("Invalid email").required("An email is required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .matches(
        PASSWORD_REGEX,
        "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      )
      .required("A password is required"),
  });

  const handleSignUpSubmit = (values, props) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((response) => {
        console.log(response);
        sendEmailVerification(response.user);
        sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);
        navigate("/home");
        props.resetForm();
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/wrong-password") {
          alert("Please check the Password");
        }
        if (error.code === "auth/user-not-found") {
          alert("Please check the Email");
        }
      });
  };

  return (
    <Formik initialValues={initialSignUpValue} validationSchema={signUpSchema} onSubmit={handleSignUpSubmit}>
      {(props) => {
        const { name } = props.values;
        return (
          <Form className={styles.container}>
            <h1>Sign up</h1>
            <Field
              as={TextField}
              label="First name"
              name="firstName"
              fullWidth
              variant="outlined"
              helperText={<ErrorMessage name="firstName"></ErrorMessage>}
              error={props.errors.firstName && props.touched.firstName}
            ></Field>
            <br></br>

            <Field
              as={TextField}
              label="Last name"
              name="lastName"
              fullWidth
              variant="outlined"
              helperText={<ErrorMessage name="lastName"></ErrorMessage>}
              error={props.errors.lastName && props.touched.lastName}
            ></Field>
            <br></br>

            <Field
              as={TextField}
              label="TradingView username"
              name="tradingViewName"
              fullWidth
              variant="outlined"
              helperText={<ErrorMessage name="tradingViewName"></ErrorMessage>}
              error={props.errors.tradingViewName && props.touched.tradingViewName}
            ></Field>
            <br></br>

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
              Sign up
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Signup;
