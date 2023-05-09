import { useState, useEffect, useReducer, Fragment } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  GameCard,
  CollectionHeader,
  Modal,
  SearchModal,
} from "../components/components";
import axios from "axios";
import { StatusModal } from "../components/StatusModal";

const CollectionPage = ({}) => {
  const { user } = useAuthContext();

  const [data, setData] = useState(null);
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [update, setUpdate] = useState([]);
  const [statusModal, setStatusModal] = useState(false);
  const [searchModal, setSearchModal] = useState(true);
  useEffect(() => {
    const fetchCollection = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/collection/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.status) {
        setData(response.data);
        setDisplayData(response.data);
        setLoading(false);
      }
    };
    setLoading(true);
    if (user) {
      fetchCollection();
    } else {
      setData(null);
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      const shallowCopy = [...displayData];
      switch (sortOrder) {
        case "ASC":
          shallowCopy.sort((a, b) => {
            if (a.data[0].name < b.data[0].name) {
              return -1;
            }
            if (a.data[0].name > b.data[0].name) {
              return 1;
            }
            return 0;
          });
          setDisplayData(shallowCopy);
          break;
        case "DSC":
          shallowCopy.sort((a, b) => {
            if (a.data[0].name < b.data[0].name) {
              return -1;
            }
            if (a.data[0].name > b.data[0].name) {
              return 1;
            }
            return 0;
          });
          shallowCopy.reverse();
          setDisplayData(shallowCopy);
          break;
        case "UPDATED":
          shallowCopy.sort((a, b) => {
            if (a.updatedAt < b.updatedAt) {
              return -1;
            }
            if (a.updatedAt > b.updatedAt) {
              return 1;
            }
            return 0;
          });
          shallowCopy.reverse();
          setDisplayData(shallowCopy);
          break;

        case "UPDATED_DSC":
          shallowCopy.sort((a, b) => {
            if (a.updatedAt < b.updatedAt) {
              return -1;
            }
            if (a.updatedAt > b.updatedAt) {
              return 1;
            }
            return 0;
          });
          setDisplayData(shallowCopy);
          break;
        default:
          break;
      }
    }
  }, [sortOrder]);

  const handleOverlay = () => {
    setOverlay(!overlay);
  };

  const handleEditModeClick = () => {
    setEditMode(!editMode);
  };

  const handleStatusModalClick = () => {
    setStatusModal(!statusModal);
  };
  return (
    <div className="page-content">
      {editMode ? (
        <div className="edit-drop">
          <p>Select</p>
          <div className="drop-buttons">
            <button className="" type="" onClick={handleStatusModalClick}>
              Selected
            </button>
            <button className="" onClick={() => setEditMode(false)}>
              Done
            </button>
          </div>
        </div>
      ) : null}

      <CollectionHeader
        title={"Collection"}
        handleOverlay={handleOverlay}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        data={data}
        setDisplayData={setDisplayData}
        handleEditModeClick={handleEditModeClick}
        editMode={editMode}
      />
      {data && user ? (
        <div className="collection">
          {displayData.map((game, index) => (
            <GameCard
              key={index}
              status={game.status}
              data={game.data[0]}
              editMode={editMode}
              update={update}
              setUpdate={setUpdate}
            />
          ))}
        </div>
      ) : null}
      {statusModal && (
        <StatusModal
          handleStatusModalClick={handleStatusModalClick}
          update={update}
          setUpdate={setUpdate}
        />
      )}
      {overlay && <SearchModal handleStatusModal={handleStatusModalClick} />}
      {overlay && <div className="overlay" onClick={handleOverlay}></div>}
    </div>
  );
};

export default CollectionPage;
