import React from "react";
import styles from "./Card.module.css";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  const toggleSignupPage = () => {
    navigate("/signup-page", {
      state: {
        price: props.price,
        terms: props.terms,
        subId: props.subId,
      },
    });
  };

  return (
    <div className={styles.container} style={{ height: props.height, width: props.width }} id={props.subId}>
      <div className={styles.cardHeader}>
        <s>
          <h3>
            {props.price}$/{props.terms}
          </h3>
          <span>{props.monthly}</span>
        </s>
        <h3 style={{ color: "red" }}>FREE</h3>
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
        <Button variant="contained" onClick={toggleSignupPage} style={{ backgroundColor: "#168a53" }}>
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default Card;
