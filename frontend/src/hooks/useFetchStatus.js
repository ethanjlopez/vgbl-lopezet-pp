import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import axios from "axios";

export const useFetchStatus = async (gameID) => {
  const [gameStatus, setGameStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/profiles/${gameID}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.status) {
          setGameStatus(response.data.playing[0].status);
        }
      } catch (error) {
        console.error("Game Status:", error);
      }
    };

    if (user) {
      setLoading(true);
      fetchStatus();
      setLoading(false);
      console.log(gameStatus)
    }
  }, [user, gameStatus, loading]);

  return { gameStatus, setGameStatus, loading };
};
