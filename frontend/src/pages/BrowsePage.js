import React, { useState, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "../css/BrowsePage.css";
import { GameCard } from "../components/components";
const BrowsePage = (props) => {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [params, setParams] = useState({
    query: "",
    order: "asc",
    sort: "",
    platforms: null,
    position: 0,
    limit: 52,
  });

  const fetchMore = async (position) => {
    const response = await axios(
      `${process.env.REACT_APP_API_ROOT}/api/games/fetch/${position}`,
      {
        params: params,
      }
    );
    if (response.status) {
      setData(data.concat(response.data));
      setDisplayData(data.concat(response.data));
    }
  };

  // const filterPlatforms = (platform) => {
  //   setParams({ ...params, platforms: platform });
  // };

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

  useEffect(() => {
    const fetchPlatforms = async () => {
      const response = await axios(
        `${process.env.REACT_APP_API_ROOT}/api/games/platforms`
      );
      if (response.status) {
        setPlatformData(response.data);
      }
    };
    fetchPlatforms();
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios(
        `${process.env.REACT_APP_API_ROOT}/api/games/`,
        {
          params: params,
        }
      );
      console.log(response);
      if (response.status) {
        setData(response.data);
        setDisplayData(response.data);
      }
    };
    fetchGames();
    console.log(params);
  }, [params]);

  return (
    <div className="page-content">
      <div className="header-col">
        <div className="header-content">
          <h1>Browse</h1>

          <div className="sort-col">
            <div className="search-wrapper">
              <div className="search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-search"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="10" cy="10" r="7" />
                  <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
              </div>

              <input
                onChange={debouncedResults}
                className="col-search"
                placeholder="Search for a game!"
              ></input>
            </div>

            <select
              className="sort"
              onChange={(e) =>
                setParams((prevState) => {
                  return { ...prevState, sort: e.target.value };
                })
              }
              defaultValue={"ADDED"}
            >
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </select>
            <select
              className="sort"
              defaultValue={"ALL"}
              onChange={(e) =>
                setParams((prevState) => {
                  return { ...prevState, platforms: e.target.value };
                })
              }
            >
              <option value="">All Platforms</option>
              {platformData
                ? platformData.map((platform, index) => {
                    return (
                      <option value={platform.name}>{platform.name}</option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="share-col">
            <div className="modify-col">
              {params.order === "asc" ? (
                <button
                  className="sort-icon"
                  onClick={() =>
                    setParams((prevState) => {
                      return { ...prevState, order: "desc" };
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-sort-ascending"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#ffffff"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="4" y1="6" x2="11" y2="6" />
                    <line x1="4" y1="12" x2="11" y2="12" />
                    <line x1="4" y1="18" x2="13" y2="18" />
                    <polyline points="15 9 18 6 21 9" />
                    <line x1="18" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              ) : (
                <button
                  className="sort-icon"
                  onClick={() =>
                    setParams((prevState) => {
                      return { ...prevState, order: "asc" };
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-sort-descending"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#ffffff"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="4" y1="6" x2="13" y2="6" />
                    <line x1="4" y1="12" x2="11" y2="12" />
                    <line x1="4" y1="18" x2="11" y2="18" />
                    <polyline points="15 15 18 18 21 15" />
                    <line x1="18" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <InfiniteScroll
          className="infinite"
          dataLength={data.length}
          hasMore={true}
          next={() => fetchMore(data.length)}
          scrollableTarget={"main"}
        >
          <div className="outer-game">
            {displayData.map((game) => (
              <GameCard data={game} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default BrowsePage;
