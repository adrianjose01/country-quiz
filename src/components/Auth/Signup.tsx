import { useState } from "react";
import styles from "./Auth.module.css";
const s = styles as unknown as { [key: string]: string };

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

interface Props {
  onIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  onSetMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Signup: React.FC<Props> = ({ onIsLogin, onSetMessage }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    password: "",
    email: "",
  });

  const onChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.message === "User created sucessfully") {
        onSetMessage("User created sucessfully. Now it's time to login");
        onIsLogin(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={s.loginContainer}>
      <h1 className={s.title}>Register</h1>
      <form className={s.form} onSubmit={onRegister}>
        <div className={s.field}>
          <label>Full Name</label>
          <input
            name="fullName"
            onChange={onChangeState}
            value={formData.fullName}
            type="text"
          />
        </div>
        <div className={s.field}>
          <label>Email</label>
          <input
            name="email"
            onChange={onChangeState}
            value={formData.email}
            type="email"
          />
        </div>
        <div className={s.field}>
          <label>password</label>
          <input
            name="password"
            onChange={onChangeState}
            value={formData.password}
            type="password"
          />
        </div>
        <div>
          <button className={s.submitButton}>Register</button>
        </div>
      </form>
      <small className={s.changeForm}>
        Already have an account? <b onClick={() => onIsLogin(true)}>Login</b>
      </small>
    </div>
  );
};

export default Signup;
