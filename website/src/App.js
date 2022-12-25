import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import Story from "./pages/Story/Story";
import Account from "./pages/Account/Account";
import LoginPage from "./pages/Login/LoginPage";
import WIP from "./components/WIP";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exactly path="/" element={<Navigate replace to="/home"></Navigate>}></Route>
        {/* <Route exactly path="/" element={<WIP></WIP>}></Route> */}
        <Route exactly path="/home" element={<Home></Home>}></Route>
        <Route exactly path="/services" element={<Services></Services>}></Route>
        <Route exactly path="/story" element={<Story></Story>}></Route>
        <Route exactly path="/account" element={<Account></Account>}></Route>
        <Route exactly path="/login-page" element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
