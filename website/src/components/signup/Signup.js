import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { TextField, Button, CircularProgress, Fade, InputAdornment, IconButton } from "@mui/material";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../index";
import moment from "moment";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PASSWORD_REGEX = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

const Signup = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [subscription, setSubscription] = useState({ id: "", price: "", terms: "" });

  const initialSignUpValue = {
    firstName: "",
    lastName: "",
    tradingViewName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    confirmPassword: Yup.string()
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref("password")], "Both password need to be the same"),
      })
      .required("Confirming your password is required"),
  });

  useEffect(() => {
    setSubscription(props.subscription);
  }, [props.subscription]);

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
          subscriptionId: subscription.id,
          subscriptionPrice: subscription.price,
          subscriptionTerms: subscription.terms,
          signupTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
        };

        addDoc(collection(db, "users"), { user });

        setIsLoading(false);
        navigate("/account");
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

  const mediaQuery = window.matchMedia("(max-width: 768px)");

  let fadeStyle = { width: "60%" };
  if (mediaQuery.matches) {
    fadeStyle.width = "90%";
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassowrd = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Fade
      in={props.value === props.index}
      style={{
        width: fadeStyle.width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div hidden={props.value !== props.index}>
        <span className={styles.warningMessage}>
          Even though the content is free for the next 90 days, the wanted subscription is selected.
        </span>
        {props.value === props.index && (
          <Formik initialValues={initialSignUpValue} validationSchema={signUpSchema} onSubmit={handleSignUpSubmit}>
            {(props) => {
              return (
                <Form className={styles.container}>
                  <h2>You can now sign up</h2>
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
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="password"></ErrorMessage>}
                    error={props.errors.password && props.touched.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword}>
                            {showPassword ? <Visibility></Visibility> : <VisibilityOff></VisibilityOff>}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  ></Field>
                  <br></br>

                  <Field
                    as={TextField}
                    label="Confirm password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="confirmPassword"></ErrorMessage>}
                    error={props.errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowConfirmPassowrd}>
                            {showConfirmPassword ? <Visibility></Visibility> : <VisibilityOff></VisibilityOff>}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  ></Field>
                  <br></br>

                  <Field
                    as={TextField}
                    label={`${subscription.price}$/${subscription.terms}`}
                    name="subscription"
                    type="text"
                    fullWidth
                    variant="outlined"
                    disabled={true}
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
        )}
      </div>
    </Fade>
  );
};

export default Signup;
