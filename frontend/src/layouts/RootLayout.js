import React, { Fragment, useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Modal, Header, Offcanvas } from "../components/components";
import {
  LoginHeader,
  LoginFooter,
  LoginForm,
  SignupForm,
  SignupFooter,
} from "../components/Forms/form";
import "../css/App.css";
import { useAuthContext } from "../hooks/useAuthContext";

const RootLayout = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const { user } = useAuthContext();

  const handleLoginClick = () => {
    setOpen(!open);
    setModalOpen(!modalOpen);
  };

  const handleSignUpClick = () => {
    setSignupModal(!signupModal);
    setOpen(!open);
  };

  const handleFormClose = () => {
    setModalOpen(false);
    setSignupModal(false);
  };

  const closeModals = () => {
    setOpen(false);
    setModalOpen(false);
    setSignupModal(false);
  };

  const handleLoginRedirect = () => {
    setModalOpen(false);
    setSignupModal(true);
  };

  const handleSignupRedirect = () => {
    setSignupModal(false);
    setModalOpen(true);
  };

  return (
    <div className="main-content" id="main">
      {open ? (
        <Offcanvas
          className="nav-list-container flex-col expanded"
          login={handleLoginClick}
          signup={handleSignUpClick}
        />
      ) : (
        <Offcanvas
          className="nav-list-container flex-col collapsed"
          login={handleLoginClick}
          signup={handleSignUpClick}
        />
      )}
      {/* CHANGE LOGIN BUTTONS FOR HEADER? */}
      {/* RENAME STATE VARIABLES  */}
      <Header
        open={open}
        setOpen={setOpen}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />

      {modalOpen && (
        <Modal
          className="modal modal-4x-5x"
          LoginHeader={<LoginHeader title={"Log in to VGBL"} />}
          handleFormClose={handleFormClose}
        >
          <LoginForm
            closeModals={closeModals}
            footer={<LoginFooter handleLoginRedirect={handleLoginRedirect} />}
          />
        </Modal>
      )}

      {signupModal && (
        <Modal
          className="modal modal-4x-5x"
          LoginHeader={<LoginHeader title={"Join VGBL today"} />}
          handleFormClose={handleFormClose}
        >
          <SignupForm
            closeModals={closeModals}
            footer={
              <SignupFooter handleSignupRedirect={handleSignupRedirect} />
            }
          />
        </Modal>
      )}

      {open || modalOpen || signupModal ? (
        <div className="overlay" onClick={closeModals}></div>
      ) : null}

      <Outlet />
      <footer className="footer">
        <p>Copyright</p>
      </footer>
    </div>
  );
};

export default RootLayout;
