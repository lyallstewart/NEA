import { NavLink } from "react-router-dom";

const ClubEntry = ({ club, isMember }) => {
  return (
    <NavLink className="club-listing" to={`/clubs/${club.id}`}>
      <div className="club-entry card">
        <p>{club.name}</p>
      </div>
    </NavLink>
  );
};

export default ClubEntry;
