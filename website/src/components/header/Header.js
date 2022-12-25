import React from "react";
import Navbar from "../navbar/Navbar";
import styles from "./header.module.css";

const Header = (props) => {
  return (
    <div className={styles.headerContainer}>
      <Navbar currentAuth={props.currentAuth}></Navbar>
    </div>
  );
};

export default Header;
