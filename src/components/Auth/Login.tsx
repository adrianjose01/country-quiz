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

const Login: React.FC<Props> = ({ onIsLogin, message, onSetMessage }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    password: "",
    email: "",
  });

  const onChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.message === "Logged in sucessfully") {
        localStorage.setItem("token", data.token);
        window.location.reload();
      }
      onSetMessage(data.message);
    } catch (error) {
      onSetMessage(String(error));
    }
  };

  return (
    <div className={s.loginContainer}>
      <p>{message}</p>
      <h1 className={s.title}>Login</h1>
      <form className={s.form} onSubmit={onLogin}>
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
          <button className={s.submitButton}>Login</button>
        </div>
      </form>
      <small className={s.changeForm}>
        You don't have an account?{" "}
        <b onClick={() => onIsLogin(false)}>Register</b>
      </small>
    </div>
  );
};

export default Login;
