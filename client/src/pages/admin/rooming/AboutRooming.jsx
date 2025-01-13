import { useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import axios from "axios";

const AboutRooming = ({ rooms, refreshRooms }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeEditId, setActiveEditId] = useState(-1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState(0);

  const handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_BASE_URL}/rooms/room/${id}`,
      withCredentials: true,
    }).then((res) => {
      if (res.data.success) {
        refreshRooms();
      }
    });
  };

  const handleStartEdit = (id) => {
    setIsEditing(true);
    const targetRoom = rooms.find((room) => room.id === id);
    setCapacity(targetRoom.capacity);
    setLocation(targetRoom.location);
    setName(targetRoom.name);
    setActiveEditId(targetRoom.id);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `${import.meta.env.VITE_BASE_URL}/rooms/room/${activeEditId}`,
      withCredentials: true,
      data: {
        name,
        location,
        capacity,
      },
    }).then((res) => {
      if (res.data.success) {
        setIsEditing(false);
        setActiveEditId(-1);
        setLocation("");
        setCapacity("");
        setName("");
        refreshRooms();
      }
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_BASE_URL}/rooms/create`,
      withCredentials: true,
      data: {
        name,
        capacity,
        location,
      },
    }).then((res) => {
      if (res.data.success) {
        setIsEditing(false);
        setActiveEditId(-1);
        setLocation("");
        setCapacity("");
        setName("");
        refreshRooms();
      }
    });
  };

  return (
    <>
      <h2>About Rooming</h2>
      <div className="card">
        <ul>
          <li>
            Student club leads may schedule events at any point prior to the
            week in which the event takes place.
          </li>
          <li>
            These events will be queued until the end of the previous week
            (Thursday at 4pm).
          </li>
          <li>At this time, the events will all be timetabled.</li>
          <li>
            Events may be scheduled after this time, however they do not have
            priority and students are limited to rooms that are not already
            taken.
          </li>
        </ul>
      </div>

      <h2>Manage Rooms</h2>
      <h3>Create / Edit Room</h3>
      <div className="card">
        <form
          id="room-request-form"
          onSubmit={
            isEditing ? (e) => handleSaveEdit(e) : (e) => handleCreate(e)
          }
        >
          <div className="input-group">
            <label htmlFor="room-request-form-name">Name</label>
            <input
              id="room-request-form-name"
              type="text"
              placeholder="An Office Here"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group input-group-horizontal">
            <div className="input-group-horizontal-field">
              <label htmlFor="room-request-form-loc">Location</label>
              <input
                id="room-request-form-loc"
                type="text"
                placeholder="Sub-Basement"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="input-group-horizontal-field">
              <label htmlFor="room-request-form-name">Room Capacity</label>
              <input
                id="room-request-form-input-capacity"
                type="number"
                placeholder="100"
                name="capcity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
          </div>

          <input
            className="btn-primary"
            type="submit"
            value={isEditing ? "Edit Room" : "Add Room"}
          />
        </form>
      </div>
      <h3>All Rooms</h3>
      <table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Room Capacity</th>
            <th>Room Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.capacity}</td>
              <td>{room.location}</td>
              <td>
                <BiTrash
                  className="rooming-delete"
                  onClick={() => handleDelete(room.id)}
                />
                <BiPencil
                  className="rooming-edit"
                  onClick={() => handleStartEdit(room.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AboutRooming;
