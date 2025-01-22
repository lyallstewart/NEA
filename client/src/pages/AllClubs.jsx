import Header from "../components/Header.jsx";
import { useContext, useEffect, useState } from "react";
import { ClubsContext } from "../context.jsx";
import ClubEntry from "../components/ClubEntry.jsx";

const AllClubs = () => {
  const { clubs, clubMemberships, setClubs, setClubMemberships } =
    useContext(ClubsContext);

  // Stores an array of IDs corresponding to clubs, of which the user is a member
  const [userMemberships, setUserMemberships] = useState([]);
  // As above, but not a member
  const [otherMemberships, setOtherMemberships] = useState([]);

  useEffect(() => {
    let tempMember = [];
    let tempNotMember = [];
    clubMemberships.forEach((membership) => {
      if (membership.isMember) {
        tempMember.push(membership.clubID);
      } else {
        tempNotMember.push(membership.clubID);
      }
    });
    setUserMemberships(tempMember);
    setOtherMemberships(tempNotMember);
  }, [clubs, clubMemberships]);

  return (
    <>
      <Header title={"All Clubs"} />
      <div className="content">
        <h2>Your Clubs</h2>
        {clubs
          .filter((club) => userMemberships.includes(club.id))
          .map((club) => (
            <ClubEntry key={club.id} club={club} isMember={true} />
          ))}
        <h2>Explore Clubs</h2>
        {clubs
          .filter((club) => !userMemberships.includes(club.id))
          .map((club) => (
            <ClubEntry key={club.id} club={club} isMember={true} />
          ))}
      </div>
    </>
  );
};

export default AllClubs;
