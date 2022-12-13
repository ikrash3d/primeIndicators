import React from "react";
import styles from "./Home.module.css";
import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import SpecialCard from "../../components/special-card/SpecialCard";
import logo from "../../assets/OriginalLogo.svg";
import { Button } from "@mui/material";

const Home = () => {
  return (
    <Layout>
      <img className={styles.imgContainer} src={logo} alt="Prime Indicator logo"></img>
      <h3 className={styles.subTitle}>Your place for the best indicators</h3>
      <Button variant="contained" style={{ backgroundColor: "#168a53" }}>
        View our services
      </Button>
      <div className={styles.servicesContainer}>
        <Card price="59.99$/month"></Card>
        <SpecialCard price="143.99$/quaterly"></SpecialCard>
        {/* <Card className={styles.specialCard} price="143.99$/quaterly"></Card> */}
        <Card price="503.99$/yearly"></Card>
      </div>
    </Layout>
  );
};

export default Home;
