import { useState } from "react";
import MyModal from "../Modal";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [islogin, setIslogin] = useState(true);
  const [messsage, setMessage] = useState("");

  const closeModal = (
    setFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setFunction(false);
  };
  return (
    <>
      <button className="auth-btn" onClick={() => setIsMainModalOpen(true)}>
        Sign in/up
      </button>
      <MyModal
        isOpen={isMainModalOpen}
        onRequestClose={() => closeModal(setIsMainModalOpen)}
        contentLabel="AuthForm"
      >
        {islogin ? (
          <Login
            onIsLogin={setIslogin}
            onSetMessage={setMessage}
            message={messsage}
          />
        ) : (
          <Signup
            onIsLogin={setIslogin}
            onSetMessage={setMessage}
            message={messsage}
          />
        )}
      </MyModal>
    </>
  );
};

export default Auth;
