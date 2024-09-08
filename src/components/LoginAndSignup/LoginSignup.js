import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { GiSplitCross } from "react-icons/gi";
import { MdEmail, MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { saveUserDataToFirestore } from "../../firebase/db";
import useAuthContextProvider from "../context/useAuth";
import { useAuth } from "../useHook/useAuth"; // Import the useAuth hook
import styles from "./LoginSignup.module.css";
import BeatLoader from "react-spinners/BeatLoader";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  const usernameRef = useRef(null); // Only used for Sign Up
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { handleSignup, handleLogin } = useAuth(); // Destructure from useAuth
  const { login } = useAuthContextProvider(); // Get login action from AuthContext
  const navigate = useNavigate();

  // Handle Signup Action
  const handleSignupClick = async (e) => {
    e.preventDefault();
    setAuthError(""); // Reset any previous errors
    setLoading(true); // Start loading when the action is triggered
    try {
      const user = await handleSignup(
        emailRef.current.value,
        passwordRef.current.value
      );

      await saveUserDataToFirestore(
        user.uid,
        emailRef.current.value,
        usernameRef.current.value,
        passwordRef.current.value
      );

      // Get Token and log in
      const token = await user.getIdToken();
      const username = usernameRef.current.value; // Get the username from the form

      // Call login with token and username
      login(token, username);

      // Navigate after successful signup
      navigate("/classify", { replace: true });
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setLoading(false); // Stop loading after the process is complete
    }
  };

  // Handle Login Action
  const handleLoginClick = async (e) => {
    e.preventDefault();
    setAuthError(""); // Reset any previous errors
    setLoading(true); // Start loading when the action is triggered
    try {
      const user = await handleLogin(
        emailRef.current.value,
        passwordRef.current.value
      );

      const token = await user.getIdToken();

      // Since the login doesn't have a username field, you might want to fetch it from Firestore or use the email as a fallback.
      const username = emailRef.current.value;

      // Call login with token and username
      login(token, username);

      navigate("/classify", { replace: true });
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setLoading(false); // Stop loading after the process is complete
    }
  };

  // Handle mode switch
  const handleModeSwitch = (newAction) => {
    setAuthError(""); // Clear any errors when switching
    setAction(newAction);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>{action}</div>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.inputs}>
        {/* Show username input only for Sign Up */}
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

      <div className={styles.submitContainer}>
        {/* Handle Sign Up */}
        <div
          className={
            action === "Sign Up"
              ? styles.submit
              : `${styles.submit} ${styles.unchecked}`
          }
          onClick={
            action === "Sign Up"
              ? handleSignupClick
              : () => handleModeSwitch("Sign Up")
          }
        >
          {loading && action === "Sign Up" ? (
            <BeatLoader color="#fff" size={12} loading={true} />
          ) : (
            "Sign Up"
          )}
        </div>

        {/* Handle Login */}
        <div
          className={
            action === "Login"
              ? styles.submit
              : `${styles.submit} ${styles.unchecked}`
          }
          onClick={
            action === "Login"
              ? handleLoginClick
              : () => handleModeSwitch("Login")
          }
        >
          {loading && action === "Login" ? (
            <BeatLoader color="#fff" size={12} loading={true} />
          ) : (
            "Login"
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
