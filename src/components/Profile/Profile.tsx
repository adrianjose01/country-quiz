import { useState } from "react";
import { User } from "../../App";
import MyModal from "../Modal";
import styles from "./Profile.module.css";
import ProfileModal from "./ProfileModal";
import ScoresModal from "./ScoresModal";
const s = styles as unknown as { [key: string]: string };

interface Props {
  User: User;
}

const Profile: React.FC<Props> = ({ User }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalToOpen, setModalToOpen] = useState("profile");

  function openModal(modal: string) {
    setModalOpen(true);
    setModalToOpen(modal);
  }

  return (
    <>
      <MyModal
        onRequestClose={() => setModalOpen(false)}
        contentLabel="profileInfo"
        isOpen={isModalOpen}
      >
        {modalToOpen === "profile" && <ProfileModal user={User} />}
        {modalToOpen === "scores" && <ScoresModal user={User} />}
      </MyModal>
      <nav className={s.nav}>
        <ul>
          <li onClick={() => openModal("profile")}>{User.fullName}</li>
          <li onClick={() => openModal("scores")}>Scores</li>
        </ul>
      </nav>
    </>
  );
};

export default Profile;
