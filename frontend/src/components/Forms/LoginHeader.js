import siteLogo from '../../assets/vgbl-logo.svg'
export const LoginHeader = (props) => (
    <div className="modal-header">
      <img alt="VGBL-logo" src={siteLogo} className="logo-img"></img>
      <h4>{props.title}</h4>
    </div>
  );