import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import logo from "../../assets/OriginalLogo.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Timer from "../../hooks/Timer";

const DAYS = 90;
const SECONDS_PER_DAY = 86440000;
const STARTING_DATE = 1672706449170;
const PROMO_DURATION = STARTING_DATE + DAYS * SECONDS_PER_DAY;

const Home = (props) => {
  const [cardDimensions, setCardDimensions] = useState({ height: "320px", width: "25%" });

  const navigate = useNavigate();

  const time = new Date();

  time.setMilliseconds(time.getMilliseconds() + (PROMO_DURATION - Date.now()));

  const toggleServicePage = () => {
    navigate("/services");
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

  return (
    <Layout currentAuth={props.currentAuth}>
      <h2>Everything is free for the next 90 days!</h2>
      <Timer expiryTimestamp={time}></Timer>
      <img className={styles.imgContainer} src={logo} alt="Prime Indicator logo"></img>
      <h3 className={styles.subTitle}>Your place for the best indicators</h3>
      <Button variant="contained" style={{ backgroundColor: "#168a53" }} onClick={toggleServicePage}>
        View our services
      </Button>

      <div className={styles.servicesContainer}>
        <Card price="59.99$/month"></Card>
        <Card height={cardDimensions.height} width={cardDimensions.width} price="143.99$/quaterly"></Card>
        <Card price="503.99$/yearly"></Card>
      </div>
    </Layout>
  );
};

export default Home;
