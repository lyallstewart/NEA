import Header from "../components/Header.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import ClubEntry from "../components/ClubEntry.jsx";
import Club from "./Club.jsx";

const AllClubs = () => {
  const [clubs, setClubs] = useState({ member: [], general: [] });

  useEffect(() => {
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/clubs/getAll`,
      withCredentials: true,
    })
      .then((res) => {
        parseMemberships(res.data.clubs, res.data.memberships);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const parseMemberships = (clubs, memberships) => {
    // Filter clubs into those of which the current user is a member, and those not.
    let memTemp = [];
    let nonMemTemp = [];

    clubs.forEach((c) => {
      const membership = memberships.find((m) => c.id === m.clubID);
      console.log(c, membership);
      if (!membership?.isMember) {
        nonMemTemp.push(c);
      } else {
        memTemp.push(c);
      }

      setClubs({ member: memTemp, general: nonMemTemp });
    });
  };

  return (
    <>
      <Header title={"All Clubs"} />
      <div className="content">
        <h2>Your Clubs</h2>
        {clubs.member.map((club) => (
          <ClubEntry club={club} key={club.id} isMember={true} />
        ))}
        <h2>Explore Clubs</h2>
        {clubs.general.map((club) => (
          <ClubEntry club={club} key={club.id} isMember={false} />
        ))}
      </div>
    </>
  );
};

export default AllClubs;
