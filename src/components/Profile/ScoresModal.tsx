import React, { useContext, useEffect } from "react";
import styles from "./Profile.module.css";
import { DataContext, User } from "../../context/dataContext";
const s = styles as unknown as { [key: string]: string };

interface Props {}

const ScoresModal: React.FC<Props> = () => {
  const token = localStorage.getItem("token") ?? "";
  const context = useContext(DataContext);

  const fetchScores = async () => {
    if (!context) return;
    const response = await fetch("http://localhost:3001/fetchScore", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: context.user?.userEmail }),
    });
    const data = await response.json();
    context.setUser((prev) => {
      if (prev) {
        return {
          ...prev,
          bestScore: data.bestScore ?? 0,
          previousScore: data.previousScore ?? 0,
        };
      }
    });
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div className={s.scoresContainer}>
      <h2>Scores</h2>
      <div className={s.field}>
        <p>Best Score:</p>
        <p>{context?.user?.bestScore}/10</p>
      </div>
      <div className={s.field}>
        <p>Previous:</p>
        <p>{context?.user?.previousScore}/10</p>
      </div>
      <div className={s.btnContainer}>
        <button className={s.resetScores}>Reset Scores</button>
      </div>
    </div>
  );
};

export default ScoresModal;
