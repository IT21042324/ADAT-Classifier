import Cookies from "js-cookie";

const COOKIE_NAME = "session";
const COOKIE_EXPIRATION_DAYS = 5;

export const useCookies = () => {
  // Function to set the session cookie with both token and username
  const setSessionCookie = (token, username) => {
    const sessionData = { token, username };
    Cookies.set(COOKIE_NAME, JSON.stringify(sessionData), {
      expires: COOKIE_EXPIRATION_DAYS,
    });
  };

  // Function to clear the session cookie
  const clearSessionCookie = () => {
    Cookies.remove(COOKIE_NAME);
  };

  // Function to get the session cookie
  const getSessionCookie = () => {
    const sessionData = Cookies.get(COOKIE_NAME);
    try {
      return sessionData ? JSON.parse(sessionData) : null; // Parse the JSON string
    } catch (error) {
      console.error("Error parsing session cookie:", error);
      return null; // Return null if parsing fails
    }
  };

  return {
    setSessionCookie,
    clearSessionCookie,
    getSessionCookie,
  };
};
