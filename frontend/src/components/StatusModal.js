import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal } from "../components/components";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  IoGiftOutline,
  IoCloseCircleOutline,
  IoCaretForwardCircleOutline,
  IoPauseCircleOutline,
  IoStopCircleOutline,
  IoSparklesOutline,
} from "react-icons/io5";
export const StatusModal = ({ handleStatusModalClick, update, setUpdate }) => {
  const { user } = useAuthContext();

  const handleSubmitStatus = async (value) => {
    if (!user) {
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/api/profiles/multi`,
        {
          games: update,
          status: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //   const removeStatus = async () => {
  //     if (!user) {
  //       return;
  //     }
  //     const response = await axios.delete("api/profiles/", {
  //       data: { gameID: params.id },
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     console.log(response);
  //     if (response.statusText) {
  //       setGameStatus(null);
  //     }
  //   };
  return (
    <Modal className={"modal-status"} handleFormClose={handleStatusModalClick}>
      <ul>
        <li>
          <button
            className="btn button status-button"
            type="submit"
            onClick={(e) => handleSubmitStatus("Wishlist")}
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
            type="button"
            onClick={(e) => handleSubmitStatus("Playing")}
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
            type="button"
            onClick={(e) => handleSubmitStatus("Planned")}
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
            type="button"
            onClick={(e) => handleSubmitStatus("Completed")}
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
            type="button"
            onClick={(e) => handleSubmitStatus("Backlog")}
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
            type="button"
            onClick={(e) => handleSubmitStatus("Dropped")}
          >
            <div>
              <IoCloseCircleOutline className="sidebar-icon" />
            </div>
            <div>Dropped</div>
          </button>
        </li>

        <li>
          <button className="btn button status-button remove-status">
            Remove
          </button>
        </li>
      </ul>
    </Modal>
  );
};
