import React from "react";
import Navbar from "../navbar/Navbar";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <Navbar></Navbar>
    </div>
  );
};

export default Header;
