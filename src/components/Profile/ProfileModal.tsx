import React from "react";
import { User } from "../../context/dataContext";
import styles from "./Profile.module.css";
const s = styles as unknown as { [key: string]: string };

interface Props {
  user: User;
}

const ProfileModal: React.FC<Props> = ({ user }) => {
  function onLogout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  async function onRemoveAccount() {
    try {
      const response = await fetch("http://localhost:3001/removeAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify({ email: user.userEmail }),
      });
      await response.json();
      if (response.status === 200) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className={s.profileContainer}>
      <h2>Profile</h2>
      <div className={s.field}>
        <p>Full Name:</p>
        <p>{user.fullName}</p>
      </div>
      <div className={s.field}>
        <p>Email:</p>
        <p>{user.userEmail}</p>
      </div>
      <div className={s.btnContainer}>
        <button className={s.deleteAccount} onClick={onRemoveAccount}>
          Delete Account
        </button>
        <button className={s.deleteAccount} onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
