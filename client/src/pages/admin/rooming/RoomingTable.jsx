import { useEffect, useState } from "react";

const RoomingTable = ({ day, slots, bookings }) => {
  const [timeslots, setTimeslots] = useState([]);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const timeslotItems = [];
    const availabilityItems = [];

    for (let slot of slots) {
      timeslotItems.push(
        <td key={slot.name}>
          {slot.name} <br /> ({slot.startTime + " - " + slot.endTime})
        </td>,
      );

      const booking = bookings?.find((b) => b.slotName === slot.name);
      availabilityItems.push(
        <td key={slot.slot}>
          <input type="checkbox" checked={booking} />
        </td>,
      );
    }

    setTimeslots(timeslotItems);
    setAvailability(availabilityItems);
  }, [slots]);

  const handleToggle = (e) => {
    e.preventDefault();
  };

  return (
    <table className="rooming-table">
      <thead>
        <tr>
          <th colSpan={slots.length + 1}>{day}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="rooming-table-side">Slot</td>
          {timeslots}
        </tr>
        <tr>
          <td className="rooming-table-side">Booked?</td>
          {availability}
        </tr>
      </tbody>
    </table>
  );
};

export default RoomingTable;
