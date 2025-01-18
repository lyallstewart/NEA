import { useContext, useEffect, useState } from "react";
import { BookingsContext, RoomsContext } from "../../../context.jsx";
import axios from "axios";
import { BiPencil, BiTrash } from "react-icons/bi";

const EventScheduling = () => {
  const { rooms, activeRoom, setActiveRoom } = useContext(RoomsContext);
  const { slots, ttEvents, setTTEvents } = useContext(BookingsContext);

  const [slotPickerOpts, setSlotPickerOpts] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [activeEditId, setActiveEditId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [room, setRoom] = useState(rooms[0]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  useEffect(() => {
    setFilteredEvents(
      ttEvents.filter((event) => {
        return event.roomId === activeRoom.id;
      }),
    );
  }, [ttEvents, activeRoom.id]);

  const handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_BASE_URL}/ttevents/event/${id}`,
      withCredentials: true,
    }).then((res) => {
      if (res.data.success) {
        /* Now the event has been removed serverside, also clear it from context. */
        setTTEvents((prevState) => prevState.filter((e) => e.id !== id));
      }
    });
  };

  const handleStartEdit = (id) => {
    const targetEvent = ttEvents.find((e) => e.id === id);

    setIsEditing(true);
    setName(targetEvent.name);
    setRoom(rooms.find((room) => room.id === targetEvent.roomId));
    handleDateChange(targetEvent.date); // Updating date needs a bit more work (updating slots), so can't just be a simple state update.
    setSlot(
      slots.find(
        (slot) =>
          slot.name === targetEvent.slotName &&
          slot.day === new Date(targetEvent.date).getDay(),
      ),
    );
    setDescription(targetEvent.description);
    setDate(targetEvent.date);
    setActiveEditId(targetEvent.id);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `${import.meta.env.VITE_BASE_URL}/ttevents/event/${activeEditId}`,
      withCredentials: true,
      data: { name, description, date, slotName: slot.name, roomId: room.id },
    }).then((res) => {
      if (res.data.success) {
        /* Also update the room information clientside */
        setTTEvents((prevState) =>
          prevState.map((e) =>
            e.id === activeEditId
              ? {
                  ...e,
                  name,
                  description,
                  date,
                  slotName: slot.name,
                  roomId: room.id,
                }
              : e,
          ),
        );

        setIsEditing(false);
        setActiveEditId(-1);
        setName("");
        setDescription("");
        setRoom("");
        setSlot("");
        setDate("");
      }
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_BASE_URL}/ttevents/create`,
      withCredentials: true,
      data: {
        name,
        description,
        date,
        slotName: slot.name,
        roomId: room.id,
      },
    }).then((res) => {
      if (res.data.success) {
        /* Create the new event clientside too */
        setTTEvents((prevState) => [...prevState, res.data.newTTEvent]);

        setSlotPickerOpts([]);
        setIsEditing(false);
        setActiveEditId(-1);
        setName("");
        setDescription("");
        setDate("");
      }
    });
  };

  const handleDateChange = (dateVal) => {
    const newDate = new Date(dateVal);
    setDate(dateVal);

    if (!isNaN(newDate)) {
      if ([0, 6].includes(newDate.getDate())) return;
      const temp = [];
      for (let s of slots) {
        if (s.day === newDate.getDay()) {
          temp.push(
            <option value={s.id} key={s.id}>
              {s.name}
            </option>,
          );
        }
      }
      setSlotPickerOpts(temp);
      setSlot(slots[0]);
    } else {
      setSlotPickerOpts([]);
      setSlot("");
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
      <h2>Create / Edit Event</h2>
      <div className="card">
        <form onSubmit={isEditing ? handleSaveEdit : handleCreate}>
          <div className="input-group-horizontal">
            <div className="input-group-horizontal-field input-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                required
              />
            </div>
            <div className="input-group-horizontal-field input-group">
              <label htmlFor="room" className="form-label">
                Room
              </label>
              <select
                value={room.id}
                onChange={(e) => {
                  setRoom(rooms.find((r) => r.id === Number(e.target.value)));
                }}
                className="form-select"
                required
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
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
            <input
              type="textarea"
              name="desc"
              className="form-textarea"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </div>
            <div className="input-group-horizontal-field input-group">
              <label htmlFor="room" className="form-label">
                Time
              </label>
              <select
                value={slot.id}
                onChange={(e) => {
                  setSlot(slots.find((s) => s.id === Number(e.target.value)));
                }}
                className="form-select"
                required
              >
                {slotPickerOpts.length > 0 ? (
                  slotPickerOpts
                ) : (
                  <option disabled>No available slots</option>
                )}
              </select>
            </div>
          </div>
          <input
            type="submit"
            className="btn-primary"
            value={isEditing ? "Save Event" : "Create Event"}
          />
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
      {!(filteredEvents.length > 0) ? (
        <div className="card">
          <p>Nothing to display.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{event.date}</td>
                <td>{event.slotName}</td>
                <td>
                  <BiTrash
                    className="rooming-delete"
                    onClick={() => handleDelete(event.id)}
                  />
                  <BiPencil
                    className="rooming-edit"
                    onClick={() => handleStartEdit(event.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default EventScheduling;
