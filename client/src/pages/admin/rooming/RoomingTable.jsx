import { useEffect, useState } from "react";

const RoomingTable = ({ day, slots }) => {
  const [timeslots, setTimeslots] = useState([]);
  const [times, setTimes] = useState([]);
  // const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const timeslotItems = [];
    const timeItems = [];
    // const availabilityItems = [];

    for (let slot of slots) {
      timeslotItems.push(<td key={slot.name}>{slot.name}</td>);
      timeItems.push(
        <td key={slot.slot}>
          {slot.startTime} - {slot.endTime}
        </td>,
      );
      // availabilityItems.push(
      //   <td key={slot.slot}>{slot.busy ? "Yes" : "No"}</td>,
      // );
    }

    setTimeslots(timeslotItems);
    setTimes(timeItems);
    // setAvailability(availabilityItems);
  }, [slots]);

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
          <td className="rooming-table-side">Time</td>
          {times}
        </tr>
        <tr>
          <td className="rooming-table-side">Free?</td>
          TODO
        </tr>
      </tbody>
    </table>
  );
};

export default RoomingTable;
