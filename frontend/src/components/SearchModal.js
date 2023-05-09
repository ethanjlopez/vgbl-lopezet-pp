import React, { useState, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "../css/SearchModal.css";

export const SearchModal = ({ handleStatusModal }) => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [params, setParams] = useState({
    query: "",
    limit: 10,
    position: 0,
  });
  const handleQuery = (e) => {
    setParams((prevState) => {
      return { ...prevState, query: e.target.value };
    });
  };

  const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleQuery, 500);
  }, []);

  const fetchMore = async (position) => {
    if (position !== 0) {
      const response = await axios(`${process.env.REACT_APP_API_ROOT}/api/games/fetch/${position}`, {
        params: params,
      });
      setData(data.concat(response.data));
      setDisplayData(data.concat(response.data));
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios(`${process.env.REACT_APP_API_ROOT}/api/games/`, {
        params: params,
      });
      if (response.status) {
        setData(response.data);
        setDisplayData(response.data);
      }
    };
    if (params.query !== "") {
      fetchGames();
    } else {
      setData([]);
      setDisplayData([]);
    }
  }, [params]);

  const updateDate = (date) => {
    const release_date = new Date(date * 1000);
    const formatted_date = release_date.toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return formatted_date;
  };

  return (
    <div className="search-modal-box">
      <div className="search-header">
        <h3>Search</h3>
      </div>
      <div>
        <input
          onChange={debouncedResults}
          className="col-search search-input"
          placeholder="Search for a game!"
        ></input>
      </div>
      <div className="infi">
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          height={700}
          next={() => fetchMore(data.length)}
          scrollableTarget={"infi"}
        >
          <div className="infinite">
            {displayData.map((game) => {
              return (
                <div className="search-container">
                  <a className="search-wrapper" href={`/${game.id}`}>
                    <div className="search-card">
                      <div className="cover-container">
                        <img alt="cover-art" src={game.cover.url}></img>
                      </div>
                      <div className="search-content">
                        <h4>{game.name}</h4>
                        {/* <h4>naughty dog</h4> */}
                        <p>{updateDate(game.first_release_date)}</p>
                        {/* <p>
                        {game.platforms.map((platform, index) => platform.name)}
                        </p> */}
                      </div>
                    </div>
                  </a>
                  <div className="search-add">
                    <button
                      className="add-btn center-circle"
                      onClick={handleStatusModal}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-plus"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#ffffff"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
