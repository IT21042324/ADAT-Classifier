import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const handleSignup = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error("Signup error:", error); // Debugging log
      throw error; // Re-throw error for the caller to handle
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error; // Re-throw error for the caller to handle
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      throw error; // Re-throw error for the caller to handle
    }
  };

  return { currentUser, handleSignup, handleLogin, logOut };
};
