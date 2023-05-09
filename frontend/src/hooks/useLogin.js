import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import axios from "axios";
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/api/users/login`,
        JSON.stringify({ email, password }),
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      // dispatch login action
      dispatch({ type: "LOGIN", payload: response.data });
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  return { login, isLoading, error };
};
