import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/api/users/signup`,
        JSON.stringify({ email, password }),
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status) {
        // SAVING USER TO LOCAL STORAGE
        // SAVES TOKEN EVEN IF BROWSER IS REFRESHED
        localStorage.setItem("user", JSON.stringify(response.data));
        // UPDATE AUTH CONTENT
        dispatch({ type: "LOGIN", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { signup, isLoading, error };
};
