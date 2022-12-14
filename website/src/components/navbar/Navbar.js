import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Menu, MenuItem, Button } from "@mui/material";
import logo from "../../assets/TransparentLogo.png";
import styles from "./navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";

const Navbar = () => {
  const [authToken, setAuthToken] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobileNavbar, setIsMobileNavbar] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobileNavbar(true);
      return;
    }
    setIsMobileNavbar(false);
  }, []);

  const toggleHomePage = () => {
    navigate("/home");
  };

  useEffect(() => {
    let token = sessionStorage.getItem("Auth Token");
    setAuthToken(token);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const renderMyAccountLink = () => {
    if (sessionStorage.getItem("Auth Token")) {
      return (
        <Link underline="none" component={RouterLink} to="/account">
          <Button variant="container" className={styles.buttonStyle}>
            My Account
          </Button>
        </Link>
      );
    }
    return (
      <Link underline="none" component={RouterLink} to="/login-page">
        <Button variant="container" className={styles.buttonStyle}>
          My Account
        </Button>
      </Link>
    );
  };

  const renderMyAccountLinkMobile = () => {
    if (sessionStorage.getItem("Auth Token")) {
      return (
        <MenuItem onClick={handleClose}>
          <Link underline="none" component={RouterLink} to="/account">
            <Button variant="container" className={styles.buttonStyle}>
              My Account
            </Button>
          </Link>
        </MenuItem>
      );
    }
    return (
      <MenuItem onClick={handleClose}>
        <Link underline="none" component={RouterLink} to="/login-page">
          <Button variant="container" className={styles.buttonStyle}>
            My Account
          </Button>
        </Link>
      </MenuItem>
    );
  };

  const renderLogoutButtonMobile = () => {
    if (authToken !== null) {
      return (
        <MenuItem onClick={handleClose}>
          <Link underline="none" component={RouterLink} to="/login-page">
            <Button variant="container" className={styles.buttonStyle} onClick={handleLogout}>
              Log Out
            </Button>
          </Link>
        </MenuItem>
      );
    }
  };
  const renderLogoutButton = () => {
    if (authToken !== null) {
      return (
        <Link underline="none" component={RouterLink} to="/login-page">
          <Button variant="container" className={styles.buttonStyle} onClick={handleLogout}>
            Log Out
          </Button>
        </Link>
      );
    }
  };

  const renderMobileMenu = () => {
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon className={styles.menuIcon}></MenuIcon>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link underline="none" component={RouterLink} to="/home">
              <Button variant="container" className={styles.buttonStyle}>
                Home
              </Button>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link underline="none" component={RouterLink} to="/services">
              <Button variant="container" className={styles.buttonStyle}>
                Services
              </Button>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link underline="none" component={RouterLink} to="/story">
              <Button variant="container" className={styles.buttonStyle}>
                Story
              </Button>
            </Link>
          </MenuItem>
          {renderMyAccountLinkMobile()}
          {renderLogoutButtonMobile()}
        </Menu>
      </div>
    );
  };

  const menuContent = () => {
    return (
      <div className={styles.contentContainer}>
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

          {renderMyAccountLink()}

          {renderLogoutButton()}
        </ul>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.separator} style={{ justifyContent: "flex-start" }}>
        <img onClick={toggleHomePage} className={styles.imgContainer} src={logo} alt="Prime Indicator logo"></img>
      </div>

      <div className={styles.separator} style={{ width: "100%" }}>
        {isMobileNavbar && renderMobileMenu()}
        {!isMobileNavbar && menuContent()}
      </div>
    </div>
  );
};

export default Navbar;
