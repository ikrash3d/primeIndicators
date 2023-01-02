import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import styles from "./Timer.module.css";

const DAYS = 90;
const SECONDS_PER_DAY = 86440.02;

const Timer = () => {
  let { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + SECONDS_PER_DAY * DAYS);
    restart(time);
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
