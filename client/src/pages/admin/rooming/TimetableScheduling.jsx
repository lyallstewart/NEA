import TimetableSchedulingTable from "./TimetableSchedulingTable.jsx";
import { useContext, useEffect } from "react";
import axios from "axios";
import { BookingsContext, RoomsContext } from "../../../context.jsx";

const TimetableScheduling = () => {
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
        <TimetableSchedulingTable day={{ name: "Monday", id: 1 }} />
        <TimetableSchedulingTable day={{ name: "Tuesday", id: 2 }} />
        <TimetableSchedulingTable day={{ name: "Wednesday", id: 3 }} />
        <TimetableSchedulingTable day={{ name: "Thursday", id: 4 }} />
        <TimetableSchedulingTable day={{ name: "Friday", id: 5 }} />
      </div>
    </>
  );
};

export default TimetableScheduling;
