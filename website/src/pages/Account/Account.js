import React, { useEffect, useState } from "react";
import styles from "./Account.module.css";
import Layout from "../../components/layout/Layout";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import { db } from "../../index";

export const Account = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    signupTime: "",
    subscription: { subscriptionId: "", subscriptionPrice: "", subscriptionTerms: "" },
    tradingViewName: "",
    uid: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const auth = getAuth();

    const currentUserUid = auth.currentUser.uid;

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      const docUserData = doc.data().user;
      const docUserUid = docUserData.userId;

      if (docUserUid === currentUserUid) {
        console.log(docUserData);
        const docUserSubId = docUserData.subscriptionId;
        let userSubscription = "You don't seem to have a subscription yet";

        if (docUserSubId !== "") {
          userSubscription = {
            subscriptionId: docUserData.subscriptionId,
            subscriptionPrice: docUserData.subscriptionPrice,
            subscriptionTerms: docUserData.subscriptionTerms,
          };
        }

        setUserDetails({
          email: auth.currentUser.email,
          firstName: docUserData.firstName,
          lastName: docUserData.lastName,
          signupTime: docUserData.signupTime,
          subscription: userSubscription,
          tradingViewName: docUserData.tradingViewName,
          uid: docUserData.userId,
        });
      }
    });
    setIsLoading(false);
  };

  return (
    <Layout>
      {isLoading && (
        <div className={styles.container}>
          <CircularProgress style={{ color: "#168a53" }}></CircularProgress>
        </div>
      )}
      {!isLoading && (
        <div className={styles.container}>
          <p>
            Hello{" "}
            <b>
              {userDetails.firstName} {userDetails.lastName}
            </b>
          </p>
          <p>
            You signed up on the : <b>{userDetails.signupTime}</b> with this email <b>{userDetails.email}</b>
          </p>
          <p>
            Your username on TradingView is: <b>{userDetails.tradingViewName}</b>
          </p>
          <p>
            Your current subscription is{" "}
            <b>
              {userDetails.subscription.subscriptionPrice}$/{userDetails.subscription.subscriptionTerms}
            </b>
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Account;
