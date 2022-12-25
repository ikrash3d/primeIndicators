import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../../assets/TransparentLogo.png";
import styles from "./navbar.module.css";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";
import { getAuth, signOut } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
const Navbar = () => {
  const [isLoggedIn] = useState(true);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [burgerMenuEffect, setBurgerMenuEffect] = useState(`${styles.closeBurgerMenu}`);

  const navigate = useNavigate();

  const toggleBurgerMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then((response) => {
        console.log(response);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(isMobileMenuOpened);
    document.body.style.overflow = "visible";
    if (isMobileMenuOpened) {
      document.body.style.overflow = "hidden";
      return;
    }
  }, [isMobileMenuOpened]);

  useEffect(() => {
    isMobileMenuOpened
      ? setBurgerMenuEffect(`${styles.openBurgerMenu}`)
      : setBurgerMenuEffect(`${styles.closeBurgerMenu}`);
  }, [isMobileMenuOpened]);

  const getCurrentUser = () => {};

  const menuContent = () => {
    return (
      <div className={`${styles.contentContainer} ${burgerMenuEffect}`}>
        <ul>
          {getCurrentUser()}
          <Link underline="none" component={RouterLink} to="/home">
            <Button variant="container" className={styles.buttonStyle}>
              Home
            </Button>
          </Link>
          <Link underline="none" component={RouterLink} to="/services">
            <Button variant="container" className={styles.buttonStyle}>
              Services
            </Button>
          </Link>
          <Link underline="none" component={RouterLink} to="/story">
            <Button variant="container" className={styles.buttonStyle}>
              Story
            </Button>
          </Link>
          <Link underline="none" component={RouterLink} to="/account">
            <Button variant="container" className={styles.buttonStyle}>
              My Account
            </Button>
          </Link>

          <Button variant="container" className={styles.buttonStyle} component={RouterLink} to="/login-page">
            Log out
          </Button>
        </ul>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.separator} style={{ justifyContent: "flex-start" }}>
        <img className={styles.imgContainer} src={logo} alt="Prime Indicator logo"></img>
      </div>

      <div className={styles.separator} style={{ width: "100%" }}>
        <div onClick={toggleBurgerMenu} className={styles.menuIconContainer}>
          <MenuIcon className={styles.menuIcon}></MenuIcon>
        </div>
        {menuContent()}
      </div>
    </div>
  );
};

export default Navbar;
