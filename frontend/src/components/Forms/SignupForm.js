import React, { Fragment, useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export const SignupForm = ({ closeModals, footer }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
    closeModals();
  };

  return (
    <div className="form-content">
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-fields">
          <label className="fs-300">Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-fields">
          <label className="fs-300">Password</label>
          <input
            type="password"
            name="password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        {footer}

        {error && <div>{error}</div>}
      </form>
    </div>
  );
};
