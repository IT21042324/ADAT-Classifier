import { useContext } from "react";
import { AuthContext } from "./Auth";

export default function useAuthContextProvider() {
  const { dispatch, login, cookie, userName, logout } = useContext(AuthContext);

  return { dispatch, login, cookie, userName, logout };
}
