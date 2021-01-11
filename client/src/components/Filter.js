import "../styles/Filter.scss";
import React from "react";

function Filter({ filterState, setFilterState }) {
  const { vegetarian, vegan, glutenfree, dairyfree } = filterState;
  return (
    <div className="filter">
      <div className="form-group">
        <label htmlFor="vegetarian">Vegetarian</label>
        <input
          type="checkbox"
          id="vegetarian"
          name="vegetarian"
          value={vegetarian}
          onChange={() =>
            setFilterState({ ...filterState, vegetarian: !vegetarian })
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="vegan">Vegan</label>
        <input
          type="checkbox"
          id="vegan"
          name="vegan"
          value={vegan}
          onChange={() => setFilterState({ ...filterState, vegan: !vegan })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="glutenfree">Gruten Free</label>
        <input
          type="checkbox"
          id="glutenfree"
          name="glutenfree"
          value={glutenfree}
          onChange={() =>
            setFilterState({ ...filterState, glutenfree: !glutenfree })
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="dairyfree">Dairy Free</label>
        <input
          type="checkbox"
          id="dairyfree"
          name="dairyfree"
          value={dairyfree}
          onChange={() =>
            setFilterState({ ...filterState, dairyfree: !dairyfree })
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="limit">Show: </label>
        <select name="limit" id="limit">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
