import Modal from "../../components/Shared/Modal.jsx";

const ClubEvents = () => {
  return (
    <>
      <div id="club-btn-hero">
        <h2>Events</h2>
        <button className="btn btn-primary">Create Event</button>
        <Modal width={100} height={800} />
      </div>
    </>
  );
};

export default ClubEvents;
