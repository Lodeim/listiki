import { useNavigate } from "react-router-dom";

import "./styles.css";

const UserBadge = ({ userName, avatarUrl, id }) => {
  const navigate = useNavigate();
  const onUserBadgeClick = () => {
    navigate(`/${id}`);
  };
  return (
    <div className="cnUserBadgeRoot" onClick={onUserBadgeClick}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="logo" className="cnUserBadgeAvatar" />
      ) : (
        <div className="cnUserBadgePlaceholder" />
      )}

      <span className="cnUserBadgeName">{userName}</span>
    </div>
  );
};

export default UserBadge;
