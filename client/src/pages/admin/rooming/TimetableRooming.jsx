import TimetableRoomingTable from "./TimetableRoomingTable.jsx";
import { useContext, useEffect } from "react";
import axios from "axios";
import { BookingsContext, RoomsContext } from "../../../context.jsx";

const TimetableRooming = () => {
  const { setSlots, setBookings } = useContext(BookingsContext);

  const { rooms, activeRoom, setActiveRoom } = useContext(RoomsContext);

  useEffect(() => {
    // Fetch slots and bookings.
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/slots/bookings`,
      withCredentials: true,
    }).then((res) => {
      setBookings(res.data.bookings);
    });
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/slots/all`,
      withCredentials: true,
    }).then((res) => {
      setSlots(res.data.slots);
    });
  }, [rooms]);

  // noinspection JSUnresolvedReference
  return (
    <>
      <h2>Manage Timetable</h2>
      <div className="card">
        <p>
          Use this page to indicate room blocking for weekly recurring events
          such as lessons, CX and PS. For one-off events such as meetings or
          interviews, use the &#34;Manage Events&#34; tab.
        </p>
      </div>
      <div id="rooming-room-selector">
        <h2>{activeRoom.name}</h2>
        <div>
          <p>Select Room:</p>
          <select
            className="room-select"
            onChange={(e) => {
              setActiveRoom(rooms.find((r) => r.name === e.target.value));
            }}
            value={activeRoom.name}
          >
            {rooms.map((room) => (
              <option key={room.id} name={room.name}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="card">
        <TimetableRoomingTable day={{ name: "Monday", id: 1 }} />
        <TimetableRoomingTable day={{ name: "Tuesday", id: 2 }} />
        <TimetableRoomingTable day={{ name: "Wednesday", id: 3 }} />
        <TimetableRoomingTable day={{ name: "Thursday", id: 4 }} />
        <TimetableRoomingTable day={{ name: "Friday", id: 5 }} />
      </div>
    </>
  );
};

export default TimetableRooming;
