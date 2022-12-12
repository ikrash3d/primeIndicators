import React from "react";
import styles from "./Card.module.css";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const Card = (props) => {
  return (
    <div className={styles.container}>
      <h3>{props.price}</h3>
      <div className={styles.contentCard}>
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
      <Button variant="contained" style={{ backgroundColor: "#168a53" }}>
        Subscribe
      </Button>
    </div>
  );
};

export default Card;
