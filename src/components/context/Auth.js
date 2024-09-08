import React, { createContext, useEffect, useReducer } from "react";
import { useCookies } from "../useHook/useCookies";

// Create the AuthContext
export const AuthContext = createContext();

// Define the authReducer outside of the provider
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        cookie: action.payload.token,
        userName: action.payload.userName,
      };
    case "LOGOUT":
      return {
        cookie: null,
        userName: "",
      };
    case "INITIALIZE_COOKIE":
      return {
        ...state,
        cookie: action.payload.token,
        userName: action.payload.userName || "", // Handle userName if provided
      };
    default:
      return state;
  }
};

export const AuthContextProvider = (props) => {
  const { setSessionCookie, clearSessionCookie, getSessionCookie } =
    useCookies();

  // Initialize user and cookie states
  const [state, dispatch] = useReducer(authReducer, {
    cookie: null,
    userName: "",
  });

  // On component mount, check for existing cookie and userName
  useEffect(() => {
    // Log the cookie once when the component mounts
    const sessionData = getSessionCookie();

    // Check for session data and initialize the state
    if (sessionData && sessionData.token) {
      dispatch({
        type: "INITIALIZE_COOKIE",
        payload: { token: sessionData.token, userName: sessionData.username },
      });
    }
  }, []); // Empty array to make sure this runs only on mount

  // Login function will now accept both token and userName
  const login = (token, userName) => {
    setSessionCookie(token, userName); // Save both the session token and userName in cookies
    dispatch({
      type: "LOGIN",
      payload: { token, userName },
    });
  };

  const logout = () => {
    clearSessionCookie(); // Clear the session cookie
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
