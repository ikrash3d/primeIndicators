import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import Story from "./pages/Story/Story";
import Account from "./pages/Account/Account";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exactly path="/" element={<Home></Home>}></Route>
        <Route exactly path="/services" element={<Services></Services>}></Route>
        <Route exactly path="/story" element={<Story></Story>}></Route>
        <Route exactly path="/account" element={<Account></Account>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
