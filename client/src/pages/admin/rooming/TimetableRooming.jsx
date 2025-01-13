import RoomingTable from "./RoomingTable.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const TimetableRooming = ({ rooms, activeRoom, setActiveRoom }) => {
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/slots/all`,
      withCredentials: true,
    }).then((res) => {
      setSlots(res.data.slots);
    });
  }, [activeRoom, rooms]);

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
            onChange={(e) =>
              setActiveRoom(rooms.find((r) => r.name === e.target.value))
            }
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

      <RoomingTable day={"Monday"} slots={slots.filter((s) => s.day === 1)} />
      <RoomingTable day={"Tuesday"} slots={slots.filter((s) => s.day === 2)} />
      <RoomingTable
        day={"Wednesday"}
        slots={slots.filter((s) => s.day === 3)}
      />
      <RoomingTable day={"Thursday"} slots={slots.filter((s) => s.day === 4)} />
      <RoomingTable day={"Friday"} slots={slots.filter((s) => s.day === 5)} />
    </>
  );
};

export default TimetableRooming;
