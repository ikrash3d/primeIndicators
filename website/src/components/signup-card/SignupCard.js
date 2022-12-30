import React from "react";
import styles from "./SignupCard.module.css";
import CheckIcon from "@mui/icons-material/Check";

const SignupCard = (props) => {
  return (
    <div
      className={styles.container}
      style={{ height: props.height, width: props.width, border: props.border }}
      id={props.id}
      onClick={props.onClick}
    >
      <div className={styles.cardHeader}>
        <h3>{props.price}</h3>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.contentP}>
          <CheckIcon style={{ color: "green" }}></CheckIcon>
          <p>Indicator</p>
        </div>
        <div className={styles.contentP}>
          <CheckIcon style={{ color: "green" }}></CheckIcon>
          <p>Trend</p>
        </div>
        <div className={styles.contentP}>
          <CheckIcon style={{ color: "green" }}></CheckIcon>
          <p>Strategy</p>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
