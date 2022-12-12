import React from "react";
import monkey from "../assets/monkey-working.jpg";

const WIP = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <h1>Site is still under construction</h1>
      <img src={monkey}></img>
    </div>
  );
};

export default WIP;
