import Header from "../../../components/Header.jsx";
import { useContext, useEffect, useState } from "react";
import TabButton from "../../../components/TabButton.jsx";
import "../../../assets/css/rooming.css";
import axios from "axios";
import AboutScheduling from "./AboutScheduling.jsx";
import TimetableScheduling from "./TimetableScheduling.jsx";
import { BookingsContext, RoomsContext } from "../../../context.jsx";
import EventScheduling from "./EventScheduling.jsx";

const MainScheduling = () => {
  const [tab, setTab] = useState(1);
  const { setRooms, setActiveRoom } = useContext(RoomsContext);
  const { setBookings, setSlots, setTTEvents } = useContext(BookingsContext);

  useEffect(() => {
    refreshRooms();
    // Fetch slots, bookings and events.
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/bookings/all`,
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
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/ttevents/all`,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      setTTEvents(res.data.events);
    });
  }, []);

  const refreshRooms = () => {
    axios({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/rooms/all`,
      withCredentials: true,
    }).then((res) => {
      setRooms(res.data.rooms);
      setActiveRoom(res.data.rooms[0]);
    });
  };

  let selectedTab;
  switch (tab) {
    case 1:
      selectedTab = <AboutScheduling />;
      break;
    case 2:
      selectedTab = <TimetableScheduling />;
      break;
    case 3:
      selectedTab = <EventScheduling />;
      break;
  }
  return (
    <>
      <Header title="Manage Scheduling">
        <div className="tab-group">
          <TabButton
            title="Manage Rooms"
            index={1}
            isActive={tab === 1}
            setIsActive={() => setTab(1)}
          />
          <TabButton
            title="Manage Timetable"
            index={3}
            isActive={tab === 2}
            setIsActive={() => setTab(2)}
          />
          <TabButton
            title="Manage Events"
            index={3}
            isActive={tab === 3}
            setIsActive={() => setTab(3)}
          />
        </div>
      </Header>
      <div className="content">{selectedTab}</div>
    </>
  );
};

export default MainScheduling;
