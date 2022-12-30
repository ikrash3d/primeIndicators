import React, { useState, useEffect } from "react";
import styles from "./SignupSubscription.module.css";

import { Button, Fade } from "@mui/material";
import SignupCard from "../signup-card/SignupCard";

const SignupSubscription = (props) => {
  const [openModal, setOpenModal] = useState(true);

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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
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

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "visible";
  }, [openModal]);

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Fade in={openModal}>
      <div className={styles.backdropContainer}>
        <div className={styles.container}>
          <div className={styles.closeButton}>
            <Button style={{ fontSize: "20px", color: "#168a53" }} onClick={handleClose}>
              X
            </Button>
          </div>
          <h2>First, chose a subscription</h2>
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

          <Button variant="contained" style={{ backgroundColor: "#168a53" }} onClick={handleClose}>
            Confirm
          </Button>
        </div>
      </div>
    </Fade>
  );
};

export default SignupSubscription;
