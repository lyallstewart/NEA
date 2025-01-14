import { useState } from "react";
import {
  ClubsContext,
  UserContext,
  BookingsContext,
  RoomsContext,
} from "./context.jsx";

const ContextProvider = ({ children }) => {
  const userInitialState = { isAuth: false, user: {} };
  const [user, setUser] = useState(userInitialState);

  const clubsInitialState = { user: null, memberClubs: [], otherClubs: [] };
  const [clubs, setClubs] = useState(clubsInitialState);

  const [bookings, setBookings] = useState([]);

  const [slots, setSlots] = useState([]);

  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ClubsContext.Provider value={{ clubs, setClubs }}>
        <BookingsContext.Provider
          value={{ bookings, setBookings, slots, setSlots }}
        >
          <RoomsContext.Provider
            value={{ rooms, setRooms, activeRoom, setActiveRoom }}
          >
            {children}
          </RoomsContext.Provider>
        </BookingsContext.Provider>
      </ClubsContext.Provider>
    </UserContext.Provider>
  );
};

export default ContextProvider;
