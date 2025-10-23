import React from "react";
import { User } from "../../App";
import styles from "./Profile.module.css";
const s = styles as unknown as { [key: string]: string };

interface Props {
  user: User;
}

const ScoresModal: React.FC<Props> = ({ user }) => {
  return (
    <div className={s.scoresContainer}>
      <h2>Scores</h2>
      <div className={s.field}>
        <p>Best Score:</p>
        <p>0</p>
      </div>
      <div className={s.field}>
        <p>Previous:</p>
        <p>0</p>
      </div>
      <div className={s.btnContainer}>
        <button className={s.resetScores}>Reset Scores</button>
      </div>
    </div>
  );
};

export default ScoresModal;
