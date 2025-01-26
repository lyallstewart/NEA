import { useParams } from "react-router";
import Header from "../../components/Header.jsx";
import { useContext, useEffect, useState } from "react";
import { ClubsContext } from "../../context.jsx";
import TabButton from "../../components/TabButton.jsx";
import { BiCalendar, BiChat, BiCog, BiSolidMegaphone } from "react-icons/bi";
import ClubAnnouncements from "./ClubAnnouncements.jsx";
import ClubMessages from "./ClubMessages.jsx";
import ClubEvents from "./ClubEvents.jsx";
import ClubSettings from "./ClubSettings.jsx";
import "../../assets/css/club.css";

const Club = () => {
  const { clubs, activeClub, setActiveClub } = useContext(ClubsContext);
  const { id } = useParams();
  const [tab, setTab] = useState(1);

  useEffect(() => {
    setActiveClub(clubs.find((club) => club.id === Number(id)));
  }, [id, clubs]);

  let activeTab = 0;
  switch (tab) {
    case 1:
      activeTab = <ClubAnnouncements />;
      break;
    case 2:
      activeTab = <ClubMessages />;
      break;
    case 3:
      activeTab = <ClubEvents />;
      break;
    case 4:
      activeTab = <ClubSettings />;
      break;
  }

  return activeClub ? (
    <>
      <Header title={activeClub.name}>
        <div className="tab-group">
          <TabButton
            title="Announcements"
            icon={<BiSolidMegaphone className="icon" />}
            index={1}
            isActive={tab === 1}
            setIsActive={() => setTab(1)}
          />
          <TabButton
            title="Chat"
            icon={<BiChat className="icon" />}
            index={2}
            isActive={tab === 2}
            setIsActive={() => setTab(2)}
          />
          <TabButton
            title="Events"
            icon={<BiCalendar className="icon" />}
            index={2}
            isActive={tab === 3}
            setIsActive={() => setTab(3)}
          />
          <TabButton
            title="Settings"
            icon={<BiCog className="icon" />}
            index={2}
            isActive={tab === 4}
            setIsActive={() => setTab(4)}
          />
        </div>
      </Header>
      <div className="content">{activeTab}</div>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default Club;
