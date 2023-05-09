import { useState } from "react";
import "../css/GameCard.css";

export const GameCard = ({ data, status, editMode, update, setUpdate }) => {
  const [selected, setSelected] = useState({
    style: "editButton",
    selected: false,
  });

  const handleSelected = () => {
    if (selected.selected) {
      setSelected({ style: "editButton", selected: false });
      removeGame(data.id);
    } else {
      setSelected({
        style: "editButton selected",
        selected: true,
      });
      addGame(data.id);
    }
  };

  const addGame = (value) => {
    setUpdate([...update, value]);
  };

  const removeGame = (value) => {
    const newArr = update.filter((game) => game !== value);
    console.log(newArr);
    setUpdate(newArr);
  };

  const checkImage = (cover) => {
    return cover.url.replace("thumb", "720p");
  };

  return (
    <div className="card-container">
      <div className="card">
        {!editMode ? (
          <a href={`/${data.id}`}>
            {!data.cover ? (
              <img
                className="card-img"
                alt="game-cover"
                src={"https://via.placeholder.com/400x400"}
              ></img>
            ) : (
              <img
                className="card-img"
                alt="game-cover"
                src={checkImage(data.cover)}
              ></img>
            )}
          </a>
        ) : (
          <button className={selected.style} onClick={handleSelected}>
            <img
              className="card-img"
              alt="game-cover"
              src={checkImage(data.cover)}
            ></img>
          </button>
        )}
        {status && (
          <button
            onClick={() => console.log(status)}
            className={`card-status ${status.toLowerCase()}`}
          >
            {status}
          </button>
        )}
      </div>
      <div className="card-title">
        <p>{data.name}</p>
      </div>
    </div>
  );
};
