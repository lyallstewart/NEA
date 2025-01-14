import Header from "../../../components/Header.jsx";
import { useContext, useEffect, useState } from "react";
import TabButton from "../../../components/TabButton.jsx";
import "../../../assets/css/rooming.css";
import axios from "axios";
import AboutRooming from "./AboutRooming.jsx";
import TimetableRooming from "./TimetableRooming.jsx";
import { RoomsContext } from "../../../context.jsx";

const MainRooming = () => {
  const [tab, setTab] = useState(1);
  const { setRooms, setActiveRoom } = useContext(RoomsContext);

  useEffect(() => {
    refreshRooms();
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
      selectedTab = <AboutRooming />;
      break;
    case 2:
      selectedTab = <TimetableRooming />;
      break;
    case 3:
      selectedTab = <ManageEvents />;
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

const ManageEvents = () => {
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
    </>
  );
};

export default MainRooming;
