import * as React from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

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
          <Link underline="none" component={RouterLink} to="/">
            <Button variant="container" style={{ color: "white" }}>
              Home
            </Button>
          </Link>
          <Link underline="none" component={RouterLink} to="/services">
            <Button variant="container" style={{ color: "white" }}>
              Services
            </Button>
          </Link>
          <Link underline="none" component={RouterLink} to="/story">
            <Button variant="container" style={{ color: "white" }}>
              Story
            </Button>
          </Link>
          <Link underline="none" component={RouterLink} to="/account">
            <Button variant="container" style={{ color: "white" }}>
              {isLoggedIn ? "My account" : "Log in"}
            </Button>
          </Link>
        </ul>
      </div>
    </div>

    //    <ul>
    //    <li>
    //      <Link to="/">Home</Link>
    //    </li>
    //    <li>
    //      <Link to="/services">Services</Link>
    //    </li>
    //    <li>
    //      <Link to="/story">Story</Link>
    //    </li>
    //    <li>
    //      <Link to="/account">Account</Link>
    //    </li>
    //  </ul>
  );
};

export default Navbar;
