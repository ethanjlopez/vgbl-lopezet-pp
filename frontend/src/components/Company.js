export const Company = ({ title, company }) => {
  return (
    <div className="box-header">
      <h3 className="mg-bot">{title}</h3>
      <p>{company}</p>
    </div>
  );
};
