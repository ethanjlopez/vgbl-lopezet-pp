import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { GameCard, CollectionHeader } from "../components/components";
import axios from "axios";

const BacklogPage = ({}) => {
  const { user } = useAuthContext();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCollection = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/api/collection/backlog`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setData(response.data);
      setLoading(false);
    };
    setLoading(true);
    if (user) {
      fetchCollection();
    } else {
      setData(null);
    }
  }, [user]);

  return (
    <div className="page-content">
      <CollectionHeader title={"Backlog"} />
      {data && user ? (
        <div className="collection">
          {data.map((game, index) => (
            <GameCard key={index} status={game.status} data={game.data[0]} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default BacklogPage;
