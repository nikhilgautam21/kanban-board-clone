import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { GROUPING_OPTIONS } from "../../config";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import StrongSignalSvg from "../../assets/svg/strong-signal.svg";
import MediumSignalSvg from "../../assets/svg/medium-signal.svg";
import WeakSignalSvg from "../../assets/svg/weak-signal.svg";

library.add(fas, faTwitter, faFontAwesome);

const KanbanIcon = ({ type, value, fontSize = "12px" }) => {
  console.log(type, value, fontSize, "KanbanIcon");
  const { STATUS, USER, PRIORITY } = GROUPING_OPTIONS;
  const icons = {
    status: {
      Todo: <FontAwesomeIcon icon="fa-solid fa-circle" fontSize={fontSize} />,
      "In progress": (
        <FontAwesomeIcon
          icon="fa-solid fa-circle-half-stroke"
          fontSize={fontSize}
        />
      ),
      Done: (
        <FontAwesomeIcon
          icon="fa-solid fa-circle-check"
          style={{ color: "#062789" }}
          fontSize={fontSize}
        />
      ),
      Cancelled: (
        <FontAwesomeIcon
          icon="fa-solid fa-circle-check"
          style={{ color: "#062789" }}
          fontSize={fontSize}
        />
      ),
      Backlog: <FontAwesomeIcon icon="fa-solid fa-book" fontSize={fontSize} />,
    },
    user: <ProfilePicture name={value} />,
    priority: {
      4: (
        <FontAwesomeIcon
          icon="fa-solid fa-exclamation"
          style={{ color: "#f40b0b" }}
          title="Urgent"
        />
      ),
      3: (
        <img
          src={StrongSignalSvg}
          alt="High Priority"
          width={"12px"}
          height={"12px"}
        />
      ),
      2: (
        <img
          src={MediumSignalSvg}
          alt="Medium Priority"
          width={"12px"}
          height={"12px"}
        />
      ),
      1: (
        <img
          src={WeakSignalSvg}
          alt="low Priority"
          width={"12px"}
          height={"12px"}
        />
      ),
      0: <FontAwesomeIcon icon="fa-solid fa-ellipsis" title="No Priority" />,
    },
  };

  if (type === STATUS) {
    return icons.status[value] || null;
  } else if (type === USER) {
    return icons.user;
  } else if (type === PRIORITY) {
    return icons.priority[value] || null;
  } else {
    return null;
  }
};

KanbanIcon.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  fontSize: PropTypes.string,
};

export default KanbanIcon;
