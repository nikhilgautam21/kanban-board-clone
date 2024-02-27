import { useEffect, useState } from "react";

import { fetchTickets } from "./services/common";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import "./App.css";
import Filter from "./components/Filter/Filter";
import { GROUPING_OPTIONS, SORTING_OPTONS } from "./config";
import LocalStorageManager from "./utils/LocalStorageManager";

const savedViewState = LocalStorageManager.getSavedViewState();
const { groupingOption, sortingOption } = savedViewState || {};

const defaultSortingOption = sortingOption || SORTING_OPTONS.PRIORITY;
const defaultGroupingOption = groupingOption || GROUPING_OPTIONS.USER;

function App() {
  const [ticketsData, setTicketsData] = useState({});
  const [groupingOption, setGroupingOption] = useState("");
  const [sortingOption, setSortingOption] = useState("");

  const handleGroupByChange = (value) => {
    setGroupingOption(value);
  };

  const handleSortByChange = (value) => {
    setSortingOption(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTickets = await fetchTickets();
      setTicketsData(fetchedTickets);
      setGroupingOption(defaultGroupingOption);
      setSortingOption(defaultSortingOption);
    };

    fetchData();
  }, []);

  return (
    <div className="kanban-board-container">
      <Filter
        onGroupingChange={handleGroupByChange}
        onOrderingChange={handleSortByChange}
        defaultGroupingOption={defaultGroupingOption}
        defaultSortingOption={defaultSortingOption}
      />
      <KanbanBoard
        ticketsData={ticketsData}
        groupingOption={groupingOption}
        sortingOption={sortingOption}
      />
    </div>
  );
}

export default App;
