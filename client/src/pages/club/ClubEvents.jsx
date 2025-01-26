const ClubEvents = () => {
  return (
    <>
      <div className="card">
        <p className="card-title">Event Scheduling</p>
        <p>
          Events may be created in the week prior to the date of occurrence. You
          may specify desired rooms, and a final room will be confirmed by the
          scheduler at the end of the week.
        </p>
        <p>
          Any last-minute events scheduled in the same week in which they occur
          will not be part of the rooming assignment. You may only therefore
          choose from already free rooms.
        </p>
      </div>
      <div className="club-hero-button">
        <h2>Club Events</h2>
        <button className="club-button btn-primary btn">New Event</button>
      </div>
      <h3>Upcoming Events</h3>
      <h3>Past Events</h3>
    </>
  );
};

export default ClubEvents;
