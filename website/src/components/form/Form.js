import React from "react";
import styles from "./Form.module.css";

const Form = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default Form;
