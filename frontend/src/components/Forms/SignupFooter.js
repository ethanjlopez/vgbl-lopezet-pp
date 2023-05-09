export const SignupFooter = ({ handleSignupRedirect }) => {
  return (
    <div className="footer-sign">
      <button
        type="button"
        className="btn btn-redirect"
        onClick={handleSignupRedirect}
      >
        Already a user? Log in
      </button>
      <button type="submit" className="btn btn-login">
        Sign Up
      </button>
    </div>
  );
};
