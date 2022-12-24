import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { TextField, Button } from "@mui/material";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import styles from "./Account.module.css";

const PASSWORD_REGEX = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/";

const Account = () => {
  const [signUpForm, setSignUpForm] = useState(false);
  const toggleSignUpForm = () => {
    setSignUpForm(!signUpForm);
  };

  const initialSignUpValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const initialLogInValue = {
    email: "",
    password: "",
  };

  const signUpSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("A first name is required"),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("A last name is required"),
    email: Yup.string().email("Invalid email").required("An email is required"),
    password: Yup.string()
      .min(4, "Too Short!")
      .matches(
        PASSWORD_REGEX,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("A password is required"),
  });

  const logInSchema = Yup.object().shape({
    email: Yup.string().required("Please provide your email"),
    password: Yup.string().required("Please provide your password"),
  });

  const handleSignUpSubmit = (values, props) => {
    console.log(values);
    props.resetForm();
  };

  const handleLogInSubmit = (values, props) => {
    console.log(values);
    props.resetForm();
  };

  const renderSignupForm = () => {
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
                label="Emai"
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
              <p>
                Already have an account? <Button onClick={toggleSignUpForm}>Log in</Button>
              </p>
            </Form>
          );
        }}
      </Formik>
    );
  };

  const renderLoginForm = () => {
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
              <p>
                Don't have an account? <Button onClick={toggleSignUpForm}>Sign up</Button>
              </p>
            </Form>
          );
        }}
      </Formik>
    );
  };

  return (
    <Layout>
      {!signUpForm && renderLoginForm()}
      {signUpForm && renderSignupForm()}
    </Layout>
  );
};

export default Account;
