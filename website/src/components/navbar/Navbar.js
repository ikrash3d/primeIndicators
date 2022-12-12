import * as React from "react";
import { useState } from "react";

import logo from "../../assets/TransparentLogo.png";
import styles from "./navbar.module.css";
import Button from "@mui/material/Button";

const Navbar = () => {
  const [isLoggedIn] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.separator}>
        <img className={styles.imgContainer} src={logo} alt="Prime Indicator logo"></img>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.separator}>
        <ul>
          <Button variant="container" style={{ color: "white" }}>
            Home
          </Button>
          <Button variant="container" style={{ color: "white" }}>
            Services
          </Button>
          <Button variant="container" style={{ color: "white" }}>
            Story
          </Button>
          <Button variant="container" style={{ color: "white" }}>
            {isLoggedIn ? "My account" : "Log in"}
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
