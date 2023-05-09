import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchGame = (gameID) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios(`${process.env.REACT_APP_API_ROOT}/api/games/id/${gameID}`);
        if (response.status) {
          setData(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    setLoading(true);
    fetchGame();
    setLoading(false);
  }, []);

  return { data, loading };
};
