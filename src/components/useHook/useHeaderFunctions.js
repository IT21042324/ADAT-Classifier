import useAuthContextProvider from "../context/useAuth";
import { useCookies } from "./useCookies";
import { useNavigate } from "react-router-dom";

export const UseHeaderFunctions = () => {
  const { clearSessionCookie } = useCookies();
  const navigate = useNavigate();
  const { logout } = useAuthContextProvider();

  const handleLogout = () => {
    logout();
    clearSessionCookie();
    navigate("/login", { replace: true });
  };

  const handleHeaderFunctions = (type) => {
    switch (type) {
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  return {
    handleHeaderFunctions,
    handleLogout,
  };
};
