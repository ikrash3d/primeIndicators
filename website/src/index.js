import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBilJ51wT2bYUnw2vKlqxuWzPD3Tu0schw",
  authDomain: "prime-indicators.firebaseapp.com",
  projectId: "prime-indicators",
  storageBucket: "prime-indicators.appspot.com",
  messagingSenderId: "42999655981",
  appId: "1:42999655981:web:f809146a1201d0535f12a4",
  measurementId: "G-L4R3JQFJ2B",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
