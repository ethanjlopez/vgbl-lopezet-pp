import React, { Fragment } from "react";

export const LoginFooter = ({ handleLoginRedirect }) => {
  return (
    <Fragment>
      <div className="forgot-link">
        <a href="/">Trouble logging in?</a>
      </div>
      <div className="footer form-fields">
        <button type="submit" className="btn btn-login">Log in</button>
        <button
          className="btn btn-signup-alt"
          onClick={handleLoginRedirect}
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </Fragment>
  );
};
