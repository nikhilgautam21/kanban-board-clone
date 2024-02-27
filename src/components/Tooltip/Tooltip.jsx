import { useState } from "react";
import "./Tooltip.css";
import PropTypes from "prop-types";

const Tooltip = ({ children, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && <div className="tooltip">{text}</div>}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
};

export default Tooltip;
