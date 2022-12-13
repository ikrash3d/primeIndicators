import React from "react";
import styles from "./SpecialCard.module.css";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const SepcialCard = (props) => {
  return (
    <div className={styles.container}>
      {/* <div class={`${styles.ribbon} ${styles.ribbonTopRight}`}>
        <span>Best Value</span>
      </div> */}

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
      <div className={styles.cardFooter}>
        <Button variant="contained" style={{ backgroundColor: "#168a53" }}>
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default SepcialCard;
