import React from "react";
import styles from "./Layout.module.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Layout = (props) => {
  return (
    <div>
      <Header></Header>
      <div className={styles.container}>{props.children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
