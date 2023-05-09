import "../css/Collection.css";
export const CollectionHeader = ({
  title,
  handleOverlay,
  sortOrder,
  setSortOrder,
  data,
  setDisplayData,
  handleEditModeClick,
  editMode,
}) => {
  const handleChange = (e) => {
    if (!e.target.value) {
      setDisplayData(data);
    } else {
      const newarr = data.filter((game) =>
        game.data[0].name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setDisplayData(newarr);
    }
  };

  const filterCollection = (value) => {
    const newarr = data.filter((game) => game.status === value);
    setDisplayData(newarr);
  };

  const reset = () => {
    setDisplayData(data);
  };

  return (
    <div className="header-col">
      <div className="header-content">
        <h1>{title}</h1>

        <div className="sort-col">
          <div className="search-wrapper">
            <div className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-search"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </div>

            <input
              className="col-search"
              placeholder="Find in collection"
              onChange={handleChange}
            ></input>
          </div>

          <select
            className="sort"
            defaultValue={"ADDED"}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="ASC">Alphabetical - A to Z</option>
            <option value="DSC">Alphabetical - Z to A</option>
            <option value="UPDATED">Ascending - Recently Updated</option>
            <option value="UPDATED_DSC">Descending - Recently Updated</option>
          </select>
          <button onClick={() => filterCollection("Playing")}>Playing</button>
          <button onClick={() => filterCollection("Planned")}>Planned</button>
          <button onClick={() => filterCollection("Completed")}>
            Completed
          </button>
          <button onClick={() => filterCollection("Backlog")}>Backlog</button>
          <button onClick={() => filterCollection("Dropped")}>Dropped</button>
          <button onClick={() => reset()}>Reset</button>
        </div>

        <div className="share-col">
          <div className="modify-col">
            {editMode ? (
              <button className="btn-col-sel" onClick={handleEditModeClick}>
                Select games
              </button>
            ) : (
              <button className="btn-col" onClick={handleEditModeClick}>
                Select games
              </button>
            )}

            <button className="btn-col" onClick={handleOverlay}>
              Add a Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
