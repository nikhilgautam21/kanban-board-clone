import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getColumnLabel, getGroupedTicketByType } from "../../utils/common";
import Ticket from "../Ticket/Ticket";
import KanbanIcon from "../KanbanIcon/KanbanIcon";
import "./KanbanBoard.css";
import { GROUPING_OPTIONS } from "../../config";

const KanbanBoard = ({ ticketsData, groupingOption, sortingOption }) => {
  const [groupedTickets, setGroupedTickets] = useState([]);

  const kanbanIconValue = (groupKey) => {
    if (groupingOption === GROUPING_OPTIONS.USER) {
      return getColumnLabel(groupingOption, groupKey, ticketsData);
    }
    return groupKey;
  };

  useEffect(() => {
    setGroupedTickets(
      getGroupedTicketByType(ticketsData, groupingOption, sortingOption)
    );
  }, [ticketsData, groupingOption, sortingOption]);

  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([groupKey, groupTickets]) => (
        <div key={groupKey} className="kanban-column">
          <div className="column-header">
            <div className="column-title">
              <KanbanIcon
                type={groupingOption}
                value={kanbanIconValue(groupKey)}
              />
              <p className="column-group-label">
                {getColumnLabel(groupingOption, groupKey, ticketsData)}
              </p>
              <span className="column-ticket-count">
                {groupTickets?.length}
              </span>
            </div>
            <div className="column-actions">
              <i className="fas fa-plus"></i>
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          </div>
          {groupTickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              ticket={ticket}
              groupingOption={groupingOption}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

KanbanBoard.propTypes = {
  ticketsData: PropTypes.object,
  groupingOption: PropTypes.string,
  sortingOption: PropTypes.string,
};

export default KanbanBoard;
