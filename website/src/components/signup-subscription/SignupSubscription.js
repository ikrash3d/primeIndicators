import React, { useState, useEffect } from "react";
import styles from "./SignupSubscription.module.css";
import { Fade } from "@mui/material";
import SignupCard from "../signup-card/SignupCard";

const SignupSubscription = (props) => {
  const [cardDimensions, setCardDimensions] = useState({ height: "320px", width: "25%" });

  const [subscriptionSelected, setSubscriptionSelected] = useState({ id: "", price: "", terms: "" });

  const subscriptions = [
    { id: 1, price: 59.99, terms: "monthly" },
    { id: 2, price: 143.99, terms: "quaterly" },
    { id: 3, price: 503.99, terms: "yearly" },
  ];

  const handleSubscription = async (subscription) => {
    setSubscriptionSelected({
      id: subscription.id,
      price: subscription.price,
      terms: subscription.terms,
    });
  };

  const mediaQuery = window.matchMedia("(max-width: 768px)");

  useEffect(() => {
    if (mediaQuery.matches) {
      setCardDimensions({ height: "", width: "90%" });
      return;
    }
    mediaQuery.addEventListener("change", () => {
      if (mediaQuery.matches) {
        setCardDimensions({ height: "", width: "90%" });
        return;
      }
      setCardDimensions({ height: "320px", width: "25%" });
    });
  }, []);

  let fadeStyle = { width: "60%" };
  if (mediaQuery.matches) {
    fadeStyle.width = "100%";
  }
  console.log(fadeStyle);

  return (
    <Fade
      in={props.value === props.index}
      style={{ width: fadeStyle.width, display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div hidden={props.value !== props.index}>
        {props.value === props.index && (
          <div className={styles.container}>
            <h2>Please, chose a subscription</h2>
            <div className={styles.subContainer}>
              {subscriptions.map((subscription) => {
                return (
                  <SignupCard
                    border={subscription.id === subscriptionSelected.id ? "2px solid #168a53" : "none"}
                    id={subscription.id}
                    key={subscription.id}
                    height={cardDimensions.height}
                    width={cardDimensions.width}
                    price={`${subscription.price}$/${subscription.terms}`}
                    onClick={(event) => handleSubscription(subscription, event)}
                  ></SignupCard>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Fade>
  );
};

export default SignupSubscription;
