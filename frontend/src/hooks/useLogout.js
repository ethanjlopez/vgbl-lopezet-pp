import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    // remove user token from storage
    try {
      localStorage.removeItem("user");
      // dispatch logout action
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error(error);
    }
  };

  return { logout };
};
