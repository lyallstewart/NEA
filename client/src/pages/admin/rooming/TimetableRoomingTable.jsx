import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BookingsContext, RoomsContext } from "../../../context.jsx";

const TimetableRoomingTable = ({ day }) => {
  const { slots } = useContext(BookingsContext);

  return (
    <>
      <h4 className="rooming-table-header">{day.name}</h4>
      <table className="rooming-table">
        <tbody>
          <tr>
            <td style={{ width: "100px" }} className="rooming-table-side">
              Slot
            </td>
            {slots
              .filter((s) => s.day === day.id)
              .map((slot) => {
                return <td key={slot.name}>{slot.name}</td>;
              })}
          </tr>
          <tr>
            <td style={{ width: "100px" }} className="rooming-table-side">
              Time
            </td>
            {slots
              .filter((s) => s.day === day.id)
              .map((slot) => {
                return (
                  <td key={slot.name}>
                    {slot.startTime + " - " + slot.endTime}
                  </td>
                );
              })}
          </tr>
          <tr>
            <td className="rooming-table-side">Booked?</td>
            {slots
              .filter((s) => s.day === day.id)
              .map((s) => (
                <SlotAvailableIndicator
                  slot={s}
                  day={day}
                  key={`${s.name}-${day.id}`}
                  len={slots.length}
                />
              ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

const SlotAvailableIndicator = ({ day, slot, len }) => {
  const { activeRoom } = useContext(RoomsContext);
  const { bookings, setBookings } = useContext(BookingsContext);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const targetBooking = bookings.filter(
      (booking) =>
        booking.slotDay === day.id &&
        booking.slotName === slot.name &&
        booking.roomId === activeRoom.id,
    );
    setIsChecked(targetBooking.length > 0);
  }, [activeRoom, bookings, day.id, slot.name]);

  const createBooking = (day, slot) => {
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_BASE_URL}/bookings/create`,
      data: { room: activeRoom.id, day: day.id, slot: slot.name },
      withCredentials: true,
    }).then((res) => {
      setBookings((prevState) => [...prevState, res.data.newBooking]);
    });
  };

  const deleteBooking = (day, slot) => {
    axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_BASE_URL}/bookings/delete`,
      data: { room: activeRoom.id, day: day.id, slot: slot.name },
      withCredentials: true,
    }).then(() => {
      setBookings((prevState) =>
        prevState.filter(
          (b) =>
            !(
              b.roomId === activeRoom.id &&
              b.slotDay === day.id &&
              b.slotName === slot.name
            ),
        ),
      );
    });
  };

  const handleToggle = (e) => {
    // Temp block the checkbox until after processing, to prevent spam clicks overloading server.
    e.target.disabled = true;

    const newCheckedState = e.target.checked;
    setIsChecked(newCheckedState);
    isChecked ? deleteBooking(day, slot) : createBooking(day, slot);

    // Unblock the checkbox now processing is finished.
    e.target.disabled = false;
  };

  return (
    <td key={`${day}-${slot.name}`}>
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
    </td>
  );
};

export default TimetableRoomingTable;
