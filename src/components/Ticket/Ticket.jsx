import PropTypes from "prop-types";

import KanbanIcon from "../KanbanIcon/KanbanIcon";
import { GROUPING_OPTIONS } from "../../config";
import "./Ticket.css";
import Tooltip from "../Tooltip/Tooltip";

const Ticket = ({ ticket, groupingOption }) => {
  const { id, title, tag: tags, user, priority, status } = ticket;
  const { PRIORITY, STATUS, USER } = GROUPING_OPTIONS;

  const renderPriorityIcon = () => {
    if (groupingOption !== PRIORITY)
      return (
        <span className="ticket-priority-icon">
          <KanbanIcon type={PRIORITY} value={priority.toString()} fontSize="10px" />
        </span>
      );
    return null;
  };

  const renderTicketStatusIcon = () => {
    if (groupingOption !== STATUS)
      return (
        <span className="ticket-status-icon">
          <KanbanIcon type={STATUS} value={status} fontSize="10px" />
        </span>
      );
    return null;
  };

  const renderUserIcon = () => {
    if (groupingOption !== USER)
      return (
        <Tooltip text={user.name}>
          <span className="assigned-user">
            <KanbanIcon
              type={GROUPING_OPTIONS.USER}
              value={user.name.charAt(0)}
            />
          </span>
        </Tooltip>
      );
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{id}</span>
        {renderUserIcon()}
      </div>
      <div className="ticket-content">
        {renderTicketStatusIcon()}
        <p className="ticket-title">{title}</p>
      </div>
      <div className="ticket-footer">
        {renderPriorityIcon()}
        {tags.map((tag) => (
          <div key={tag} className="ticket-tag">
            <span className="tag-circle"></span>
            <span className="tag-text">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

Ticket.propTypes = {
  ticket: PropTypes.object,
  groupingOption: PropTypes.string,
};

export default Ticket;
