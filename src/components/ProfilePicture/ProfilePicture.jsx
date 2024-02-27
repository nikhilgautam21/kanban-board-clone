import { useMemo } from "react";
import PropTypes from "prop-types";
import "./ProfilePicture.css";
import { stringToColor } from "../../utils/common";

const ProfilePicture = ({ name }) => {
  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
    : "";

  const backgroundColor = useMemo(() => {
    return stringToColor(name || "");
  }, [name]);

  return (
    <div className="profile-picture" style={{ backgroundColor }}>
      <span>{initials}</span>
    </div>
  );
};

ProfilePicture.propTypes = {
  name: PropTypes.string,
};

export default ProfilePicture;
