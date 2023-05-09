import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  IoGiftOutline,
  IoCloseCircleOutline,
  IoCaretForwardCircleOutline,
  IoPauseCircleOutline,
  IoStopCircleOutline,
  IoSparklesOutline,
} from "react-icons/io5";
import {
  Modal,
  Rating,
  Screenshots,
  Category,
  Company,
  ScreenshotCarousel,
} from "../components/components";

import { useAuthContext, useFetchGame } from "../hooks/hooks.js";

import "../css/GameEntryPage.css";

const summaryReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_DATA": {
      return {
        ...state,
        summary: action.data,
        expanded: false,
      };
    }
    case "EXPAND": {
      return {
        ...state,
        expanded: true,
        textLength: state.summary.length,
      };
    }
    case "COLLAPSE": {
      return {
        ...state,
        expanded: false,
        textLength: 500,
      };
    }
    default:
      return state;
  }
};

const GameEntryPage = (props) => {
  const params = useParams();
  const { user } = useAuthContext();
  const { data, loading } = useFetchGame(params.id);
  const [publisher, setPublisher] = useState(null);
  const [developer, setDeveloper] = useState(null);
  const [date, setDate] = useState(null);
  const [cover, setCover] = useState("https://via.placeholder.com/400");
  const [screenshots, setScreenshots] = useState(null);
  const [genres, setGenres] = useState(null);
  const [platforms, setPlatforms] = useState(null);
  const [ageRatings, setAgeRatings] = useState(null);
  const [statusModal, setStatusModal] = useState(false);
  const [summary, dispatch] = useReducer(summaryReducer, {
    summary: null,
    textLength: 500,
    expanded: false,
  });
  const [gameStatus, setGameStatus] = useState(null);
  const [carousel, setCarousel] = useState({ expand: false, index: 0 });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ROOT}/api/profiles/${params.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.status) {
          console.log(response.data.status);
          setGameStatus(response.data.status);
        }
      } catch (error) {
        console.error("Game Status:", error);
      }
    };
    if (user) {
      fetchStatus();
    }
  }, [user]);

  useEffect(() => {
    const updateInvolvedCompanies = (company) => {
      if (company) {
        for (let i = 0; i < company.length; i++) {
          if (company[i].developer) {
            setDeveloper(company[i].company.name);
          }
          if (company[i].publisher) {
            setPublisher(company[i].company.name);
          }
        }
      }
    };

    const updateDate = (date) => {
      const release_date = new Date(date * 1000);
      const formatted_date = release_date.toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      setDate(formatted_date);
    };

    const updateURL = (cover) => {
      if (cover) {
        const newURL = cover.url.replace("thumb", "1080p");
        setCover(newURL);
      }
    };

    // TODO: Refactor into better way for state
    if (data) {
      // console.log(data);
      updateInvolvedCompanies(data.involved_companies);
      dispatch({ type: "UPDATE_DATA", data: data.summary });
      updateDate(data.first_release_date);
      updateURL(data.cover);
      setGenres(data.genres);
      setPlatforms(data.platforms);
      setScreenshots(data.screenshots);
      setAgeRatings(data.age_ratings);
    } else {
      console.log("error");
    }
  }, [data]);

  const Summary = ({ summary }) => {
    const handleCollapse = () => {
      dispatch({ type: "COLLAPSE" });
    };
    const handleExpand = () => {
      dispatch({ type: "EXPAND" });
    };
    if (summary.summary) {
      if (summary.summary.length < summary.textLength)
        return <p>{summary.summary}</p>;
      else {
        if (summary.expanded) {
          return (
            <div>
              <p>{summary.summary}</p>
              <button
                className="btn btn-trans btn-show"
                onClick={() => handleCollapse()}
              >
                Less
              </button>
            </div>
          );
        } else {
          return (
            <div>
              <p>{summary.summary.slice(0, summary.textLength) + " ..."}</p>
              <button
                className="btn btn-trans btn-show"
                onClick={() => handleExpand()}
              >
                More
              </button>
            </div>
          );
        }
      }
    }
  };

  const handleStatusModalClick = () => {
    setStatusModal(!statusModal);
  };

  const handleSubmitStatus = (e, val) => {
    e.preventDefault();
    setStatus(val);
  };

  const setStatus = async (status) => {
    if (!user) {
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/api/profiles/${status}`,
        {
          gameID: params.id,
          data: [data],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status) {
        setStatusModal(!statusModal);
        setGameStatus(status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeStatus = async () => {
    if (!user) {
      return;
    }
    const response = await axios.delete(
      `${process.env.REACT_APP_API_ROOT}/api/profiles/`,
      {
        data: { gameID: params.id },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(response);
    if (response.status) {
      setGameStatus(null);
    }
  };

  return (
    <div className="page-content">
      <div className="outer">
        <div className="blur">
          <img alt="backgroundImage" className="outer-image" src={cover}></img>
        </div>
      </div>
      {data && (
        <div>
          <div className="flex-col">
            <div className="box box-collapse mg-top-bot-16">
              <div className="game-cover">
                {cover ? (
                  <img alt="null" src={cover}></img>
                ) : (
                  <div className="loader"></div>
                )}
              </div>
              <div className="subheader mg-bot">
                <div className="game-title">
                  <h1>{data.name}</h1>
                </div>
                {"involved_companies" in data ? (
                  <div className="dev-release-container">
                    <div>{developer}</div>
                    <div> • </div>
                    <span>{date}</span>
                  </div>
                ) : (
                  <div className="subheader">
                    <span>{date}</span>
                  </div>
                )}
                <div className="status-container">
                  <button
                    className="btn btn-status pad-btn"
                    onClick={() => setStatusModal(!statusModal)}
                  >
                    Change Status
                  </button>
                  {gameStatus && (
                    <button
                      className="btn btn-status pad-btn"
                      onClick={() => setStatusModal(!statusModal)}
                    >
                      {gameStatus}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {"screenshots" in data ? (
              <div className="box pad-24 mg-top-bot-16">
                <h3 className="box-header box-header-fs">
                  Images & Screenshots
                </h3>
                <div className="grid grid-container">
                  {"videos" in data ? (
                    <div className="video-container">
                      <iframe
                        className="video"
                        title="video"
                        src={`https://www.youtube.com/embed/${data.videos[0].video_id}`}
                      ></iframe>
                    </div>
                  ) : null}
                  {screenshots && (
                    <Screenshots
                      screenshot={screenshots}
                      setCarousel={setCarousel}
                    />
                  )}
                </div>
              </div>
            ) : null}

            <div className="box pad-24 mg-top-bot-16">
              <h3 className="box-header box-header-fs">Summary</h3>

              <div className="grid grid-summary">
                {summary.summary && <Summary summary={summary} />}
                {ageRatings && <Rating categoryList={ageRatings} />}
                <div>
                  {developer && (
                    <Company title={"Developers"} company={developer} />
                  )}
                  {publisher && (
                    <Company title={"Publisher"} company={publisher} />
                  )}
                </div>

                <div>
                  {genres && <Category title={"Genres"} categories={genres} />}
                  {platforms && (
                    <Category title={"Platforms"} categories={platforms} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {statusModal && (
        <Modal
          className={"modal-status"}
          handleFormClose={handleStatusModalClick}
        >
          <ul>
            <li>
              <button
                className="btn button status-button"
                onClick={(e) => handleSubmitStatus(e, "Wishlist")}
              >
                <div>
                  <IoGiftOutline className="sidebar-icon" />
                </div>
                <div>Wishlist</div>
              </button>
            </li>
            <li>
              <button
                className="btn button status-button"
                onClick={(e) => handleSubmitStatus(e, "Playing")}
              >
                <div>
                  <IoCaretForwardCircleOutline className="sidebar-icon" />
                </div>
                <div>Playing</div>
              </button>
            </li>
            <li>
              <button
                className="btn button status-button"
                onClick={(e) => handleSubmitStatus(e, "Planned")}
              >
                <div>
                  <IoPauseCircleOutline className="sidebar-icon" />
                </div>
                <div>Planned</div>
              </button>
            </li>
            <li>
              <button
                className="btn button status-button"
                onClick={(e) => handleSubmitStatus(e, "Completed")}
              >
                <div>
                  <IoSparklesOutline className="sidebar-icon" />
                </div>
                <div>Completed</div>
              </button>
            </li>
            <li>
              <button
                className="btn button status-button"
                onClick={(e) => handleSubmitStatus(e, "Backlog")}
              >
                <div>
                  <IoStopCircleOutline className="sidebar-icon" />
                </div>
                <div>Backlog</div>
              </button>
            </li>
            <li>
              <button
                className="btn button status-button"
                onClick={(e) => handleSubmitStatus(e, "Dropped")}
              >
                <div>
                  <IoCloseCircleOutline className="sidebar-icon" />
                </div>
                <div>Dropped</div>
              </button>
            </li>

            <li>
              <button
                className="btn button status-button remove-status"
                onClick={removeStatus}
              >
                Remove
              </button>
            </li>
          </ul>
        </Modal>
      )}
      {carousel.expand && (
        <ScreenshotCarousel
          images={screenshots}
          carousel={carousel}
          setCarousel={setCarousel}
        />
      )}

      {statusModal ? (
        <div className="overlay" onClick={handleStatusModalClick}></div>
      ) : null}
    </div>
  );
};

export default GameEntryPage;
