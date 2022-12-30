import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { TextField, Button, CircularProgress } from "@mui/material";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../index";
import moment from "moment";
import SignupSubscription from "../signup-subscription/SignupSubscription";

const PASSWORD_REGEX = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

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
    tradingViewName: Yup.string().required("Your TradingView username is required"),
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
    setIsLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((response) => {
        sendEmailVerification(response.user);
        sessionStorage.setItem("Auth Token", response._tokenResponse.refreshToken);

        const user = {
          userId: response.user.uid,
          firstName: values.firstName,
          lastName: values.lastName,
          tradingViewName: values.tradingViewName,
          email: values.email,
          subscription: "",
          signupTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
        };

        addDoc(collection(db, "users"), { user });

        setIsLoading(false);
        navigate("/home");
        props.resetForm();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        if (error.code === "auth/wrong-password") {
          alert("Please check the Password");
        }
        if (error.code === "auth/user-not-found") {
          alert("Please check the Email");
        }
      });
  };

  return (
    <div className={styles.divContainer}>
      <SignupSubscription></SignupSubscription>
      <Formik initialValues={initialSignUpValue} validationSchema={signUpSchema} onSubmit={handleSignUpSubmit}>
        {(props) => {
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

              {!isLoading && (
                <Button type="submit" variant="contained" style={{ backgroundColor: "#168a53" }}>
                  Sign up
                </Button>
              )}
              {isLoading && <CircularProgress style={{ color: "#168a53" }}></CircularProgress>}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signup;
