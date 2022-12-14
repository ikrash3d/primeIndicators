import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import logo from "../../assets/OriginalLogo.svg";
import { Button } from "@mui/material";

const Home = () => {
  const [cardDimensions, setCardDimensions] = useState({ height: "320px", width: "25%" });

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
    <Layout>
      <img className={styles.imgContainer} src={logo} alt="Prime Indicator logo"></img>
      <h3 className={styles.subTitle}>Your place for the best indicators</h3>
      <Button variant="contained" style={{ backgroundColor: "#168a53" }}>
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
