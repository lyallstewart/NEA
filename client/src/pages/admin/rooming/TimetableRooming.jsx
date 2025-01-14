import RoomingTable from "./RoomingTable.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const TimetableRooming = ({ rooms, activeRoom, setActiveRoom }) => {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    refreshBookings();

    axios({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/slots/all`,
      withCredentials: true,
    }).then((res) => {
      setSlots(res.data.slots);
    });
  }, [activeRoom, rooms, slots]);

  const refreshBookings = () => {
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/slots/bookings`,
      withCredentials: true,
    }).then((res) => {
      setBookings(res.data.bookings);
    });
  };

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
              refreshBookings();
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
        <RoomingTable
          day={"Monday"}
          slots={slots.filter((s) => s.day === 1)}
          bookings={bookings.filter(
            (b) => b.day === 1 && b.roomName === activeRoom.name,
          )}
        />
        <RoomingTable
          day={"Tuesday"}
          slots={slots.filter((s) => s.day === 2)}
          bookings={bookings.filter(
            (b) => b.day === 2 && b.roomName === activeRoom.name,
          )}
          activeRoom={activeRoom.name}
        />
        <RoomingTable
          day={"Wednesday"}
          slots={slots.filter((s) => s.day === 3)}
          bookings={bookings.filter(
            (b) => b.day === 3 && b.roomName === activeRoom.name,
          )}
          activeRoom={activeRoom.name}
        />
        <RoomingTable
          day={"Thursday"}
          slots={slots.filter((s) => s.day === 4)}
          bookings={bookings.filter(
            (b) => b.day === 4 && b.roomName === activeRoom.name,
          )}
          activeRoom={activeRoom.name}
        />
        <RoomingTable
          day={"Friday"}
          slots={slots.filter((s) => s.day === 5)}
          bookings={bookings.filter(
            (b) => b.day === 5 && b.roomName === activeRoom.name,
          )}
          activeRoom={activeRoom.name}
        />
      </div>
      <button className="btn-primary" type="submit">
        Save Changes
      </button>
    </>
  );
};

export default TimetableRooming;
