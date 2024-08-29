import { useRef, useState } from "react";
import styles from "./LoginSignup.module.css";
import { MdEmail, MdOutlinePassword } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GiSplitCross } from "react-icons/gi";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [authError, setAuthError] = useState("");

  // form input refs
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Username:", usernameRef.current.value);
    console.log("Email:", emailRef.current.value);
    console.log("Password:", passwordRef.current.value);
  };

  const signUpAction = (e) => {
    setAction("Sign Up");

    if (action === "Sign Up") {
      handleSignup(e);
    }
  };

  const loginAction = (e) => {
    setAction("Login");

    if (action === "Login") {
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>{action}</div>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.inputs}>
        {action === "Sign Up" && (
          <div className={styles.input}>
            <FaUser className={styles.iconStyle} />
            <input
              type="text"
              placeholder="Username"
              className={styles.inputTextField}
              ref={usernameRef}
            />
          </div>
        )}

        <div className={styles.input}>
          <MdEmail className={styles.iconStyle} />
          <input
            type="email"
            placeholder="Email"
            className={styles.inputTextField}
            ref={emailRef}
          />
        </div>

        <div className={styles.input}>
          <MdOutlinePassword className={styles.iconStyle} />
          <input
            type="password"
            placeholder="Password"
            className={styles.inputTextField}
            ref={passwordRef}
          />
        </div>

        {authError && (
          <div className={styles.errorMessage}>
            <GiSplitCross className={styles.iconStyle} />
            <p className={styles.authError}>{authError}</p>
          </div>
        )}
      </div>

      {action === "Login" && (
        <div className={styles.forgotPassword}>
          <div className={styles.clickHereContainer}>
            <span className={styles.lostPassword}>Lost Password?</span>
            <div className={styles.clickHereLine}></div>
          </div>

          <div className={styles.clickHereContainer}>
            <span className={styles.clickHereText}>Click Here!</span>
            <div className={styles.clickHereLine}></div>
          </div>
        </div>
      )}

      <div className={styles.submitContainer}>
        <div
          className={
            action === "Sign Up"
              ? styles.submit
              : `${styles.submit} ${styles.unchecked}`
          }
          onClick={signUpAction}
        >
          Sign Up
        </div>
        <div
          className={
            action === "Login"
              ? styles.submit
              : `${styles.submit} ${styles.unchecked}`
          }
          onClick={loginAction}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
