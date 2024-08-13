import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // We don't have to send a request to the backend

    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};

export default useLogout;
