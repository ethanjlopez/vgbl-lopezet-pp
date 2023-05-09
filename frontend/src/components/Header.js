import React, { Fragment, useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const Header = ({ open, setOpen, modalOpen, setModalOpen }) => {
  const { user } = useAuthContext();

  return (
    <header className="header">
      <button
        className="side-button centered round toggled-off"
        onClick={() => setOpen(!open)}
      ></button>
      <div>
        {user ? (
          <button className="profile side-button centered round"></button>
        ) : (
          <div>
            <button
              className="btn button"
              onClick={() => setModalOpen(!modalOpen)}
            >
              Login
            </button>
            <button
              className="btn button"
              onClick={() => setModalOpen(!modalOpen)}
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
