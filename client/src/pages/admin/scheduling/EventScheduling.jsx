import { useContext, useState } from "react";
import { BookingsContext, RoomsContext } from "../../../context.jsx";

const EventScheduling = () => {
  const { rooms, activeRoom, setActiveRoom } = useContext(RoomsContext);
  const { slots } = useContext(BookingsContext);
  const [date, setDate] = useState("");
  const [slotPickerOpts, setSlotPickerOpts] = useState([]);
  const [slotPickerIsDisabled, setSlotPickerIsDisabled] = useState(true);

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setDate(e.target.value);

    if (!isNaN(newDate)) {
      if ([0, 6].includes(newDate.getDate())) {
        return;
      }
      const temp = [];
      for (let s of slots) {
        if (s.day === newDate.getDay()) {
          temp.push(
            <option key={s.id} value={s.name}>
              {s.name}
            </option>,
          );
        }
      }
      setSlotPickerOpts(temp);
      setSlotPickerIsDisabled(false);
    } else {
      setSlotPickerOpts([]);
      setSlotPickerIsDisabled(true);
    }
  };

  return (
    <>
      <h2>Manage Events</h2>
      <div className="card">
        <p>
          Use this page to indicate room blocking for one-off events such as
          meetings or interviews. For lesson and recurring room bookings, use
          the &#34;Manage Timetable&#34; tab.
        </p>
      </div>
      <h2>Create Event</h2>
      <div className="card">
        <form>
          <div className="input-group-horizontal">
            <div className="input-group-horizontal-field input-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" name="name" />
            </div>
            <div className="input-group-horizontal-field input-group">
              <label htmlFor="room" className="form-label">
                Room
              </label>
              <select name="room" className="form-select">
                {rooms.map((room) => (
                  <option key={room.id} name={room.name}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <input type="textarea" name="desc" className="form-textarea" />
          </div>
          <div className="input-group-horizontal">
            <div className="input-group-horizontal-field input-group">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                name="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={date}
                onChange={handleDateChange}
              />
            </div>
            <div className="input-group-horizontal-field input-group">
              <label htmlFor="room" className="form-label">
                Time
              </label>
              <select
                name="room"
                className="form-select"
                disabled={slotPickerIsDisabled}
                required
              >
                {
                  // Ensure date is a valid Date object and slots is a valid array
                  slotPickerOpts.length > 0 ? (
                    slotPickerOpts
                  ) : (
                    <option disabled>No available slots</option>
                  )
                }
              </select>
            </div>
          </div>
        </form>
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
    </>
  );
};

export default EventScheduling;
