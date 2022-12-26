import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logo from "../../assets/TransparentLogo.png";
import styles from "./navbar.module.css";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [burgerMenuEffect, setBurgerMenuEffect] = useState(`${styles.closeBurgerMenu}`);
  const navigate = useNavigate();

  useEffect(() => {
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

  useEffect(() => {
    let token = sessionStorage.getItem("Auth Token");
    setAuthToken(token);
  }, []);

  const toggleBurgerMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);

      sessionStorage.removeItem("Auth Token");

      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };

  const renderLogInLogOutButton = () => {
    if (authToken !== null) {
      return (
        <Button
          variant="container"
          className={styles.buttonStyle}
          component={RouterLink}
          onClick={handleLogout}
          to="/login-page"
        >
          Log Out
        </Button>
      );
    }
  };

  const menuContent = () => {
    return (
      <div className={`${styles.contentContainer} ${burgerMenuEffect}`}>
        <ul>
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
          <Link underline="none" component={RouterLink} to="/login-page">
            <Button variant="container" className={styles.buttonStyle}>
              My Account
            </Button>
          </Link>

          {renderLogInLogOutButton()}
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
