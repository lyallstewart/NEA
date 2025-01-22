import { useState } from "react";
import {
  BookingsContext,
  ClubsContext,
  RoomsContext,
  UserContext,
} from "./context.jsx";

const ContextProvider = ({ children }) => {
  const userInitialState = { isAuth: false, user: {} };
  const [user, setUser] = useState(userInitialState);

  const [clubs, setClubs] = useState([]);
  const [clubMemberships, setClubMemberships] = useState([]);
  const [activeClub, setActiveClub] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [ttEvents, setTTEvents] = useState([]); // Timetabled events

  const [slots, setSlots] = useState([]);

  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ClubsContext.Provider
        value={{
          clubs,
          setClubs,
          clubMemberships,
          setClubMemberships,
          activeClub,
          setActiveClub,
        }}
      >
        <BookingsContext.Provider
          value={{
            bookings,
            setBookings,
            slots,
            setSlots,
            ttEvents,
            setTTEvents,
          }}
        >
          <RoomsContext.Provider
            value={{
              rooms,
              setRooms,
              activeRoom,
              setActiveRoom,
            }}
          >
            {children}
          </RoomsContext.Provider>
        </BookingsContext.Provider>
      </ClubsContext.Provider>
    </UserContext.Provider>
  );
};

export default ContextProvider;
