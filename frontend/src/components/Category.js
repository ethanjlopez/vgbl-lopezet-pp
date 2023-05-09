export const Category = ({ title, categories }) => {
  const mapCategory = (items) => {
    return items.map((item, index) => (
      <li key={index}>{(index ? ", " : "") + " " + item.name}</li>
    ));
  };
  return (
    <div className="box-header">
      <h3 className="mg-bot">{title}</h3>
      <ul className="desc-list">{mapCategory(categories)}</ul>
    </div>
  );
};

