import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import styles from "./Timer.module.css";

const Timer = ({ expiryTimestamp }) => {
  let { seconds, minutes, hours, days, start } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    start();
  }, []);

  const setTime = () => {
    if (days.toString().length === 1) {
      days = days.toString().padStart(2, "0");
    }

    if (hours.toString().length === 1) {
      hours = hours.toString().padStart(2, "0");
    }

    if (minutes.toString().length === 1) {
      minutes = minutes.toString().padStart(2, "0");
    }
    if (seconds.toString().length === 1) {
      seconds = seconds.toString().padStart(2, "0");
    }
  };

  return (
    <div className={styles.container}>
      {setTime()}
      <div className={styles.timerDisplay}>
        <div className={styles.time}>
          <span>DAYS</span>
          <div>
            <span>{days.toString().slice(0, 1)}</span>
            <span>{days.toString().slice(1)}</span>
          </div>
        </div>
        <span className={styles.divider}>:</span>
        <div className={styles.time}>
          <span>HOURS</span>
          <div>
            <span>{hours.toString().slice(0, 1)}</span>

            <span>{hours.toString().slice(1)}</span>
          </div>
        </div>
        <span className={styles.divider}>:</span>
        <div className={styles.time}>
          <span>MINUTES</span>
          <div>
            <span>{minutes.toString().slice(0, 1)}</span>
            <span>{minutes.toString().slice(1)}</span>
          </div>
        </div>
        <span className={styles.divider}>:</span>
        <div className={styles.time}>
          <span>SECONDS</span>
          <div>
            <span>{seconds.toString().slice(0, 1)}</span>
            <span>{seconds.toString().slice(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
