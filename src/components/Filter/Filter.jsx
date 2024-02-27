import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useOutsideClick from "../../hooks/useOutsideClick";
import { GROUPING_OPTIONS, SORTING_OPTONS } from "../../config";
import { createDropdownOptions } from "../../utils/common";
import "./Filter.css";
import LocalStorageManager from "../../utils/LocalStorageManager";

const Filter = ({
  onGroupingChange,
  onOrderingChange,
  defaultGroupingOption,
  defaultSortingOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroupBy, setSelectedGroupBy] = useState("");
  const [selectedSortBy, setSelectedSortBy] = useState("");

  const filterRef = useRef(null);

  const groupingOptions = createDropdownOptions(
    Object.values(GROUPING_OPTIONS)
  );
  const sortingOptions = createDropdownOptions(Object.values(SORTING_OPTONS));

  useEffect(() => {
    setSelectedGroupBy(defaultGroupingOption);
    setSelectedSortBy(defaultSortingOption);
  }, []);

  useEffect(() => {
    // Save user's view state to local storage
    LocalStorageManager.saveViewState({
      groupingOption: selectedGroupBy,
      sortingOption: selectedSortBy,
    });
  }, [selectedGroupBy, selectedSortBy]);

  useOutsideClick(filterRef, () => {
    setIsOpen(false);
  });

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleGroupingChange = (e) => {
    const value = e?.target?.value;
    onGroupingChange(e.target.value);
    setIsOpen(false);
    setSelectedGroupBy(value);
  };

  const handleOrderingChange = (e) => {
    const value = e?.target?.value;
    onOrderingChange(value);
    setIsOpen(false);
    setSelectedSortBy(value);
  };

  return (
    <div className="filter">
      <div ref={filterRef} className="filter-toggle-wrapper">
        <button className="filter-toggle" onClick={toggleFilter}>
          <i className="fas fa-filter"></i> Display{" "}
          <i
            className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
          ></i>
        </button>
        {isOpen && (
          <div className="filter-options">
            <div className="filter-option">
              <label htmlFor="grouping">Grouping</label>
              <select
                id="grouping"
                onChange={handleGroupingChange}
                value={selectedGroupBy}
              >
                {groupingOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-option">
              <label htmlFor="ordering">Ordering</label>
              <select
                id="ordering"
                onChange={handleOrderingChange}
                value={selectedSortBy}
              >
                {sortingOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Filter.propTypes = {
  onGroupingChange: PropTypes.func,
  onOrderingChange: PropTypes.func,
  defaultSortingOption: PropTypes.string,
  defaultGroupingOption: PropTypes.string,
};

export default Filter;
