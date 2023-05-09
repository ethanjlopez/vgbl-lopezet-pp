import React from "react";
import "../css/Modal.css";

export const Modal = ({
  className,
  LoginHeader,
  handleFormClose,
  children,
}) => {
  return (
    <div className={className}>
      <div className="form-alt">
        <button className="btn-modal-close" onClick={handleFormClose}>
          {/* <img src={closeIcon} className="close-icon"></img> */}
        </button>
      </div>
      {LoginHeader}
      <div className="modal-content">{children}</div>
    </div>
  );
};

// import React from 'react';
// import ComponentA from './ComponentA';
// import ComponentB from './ComponentB';

// const MyComponent = ({ showA }) => {
//   return (
//     <div>
//       {showA ? <ComponentA /> : <ComponentB />}
//     </div>
//   );
// }

// export default MyComponent;
