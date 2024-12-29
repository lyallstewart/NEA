import Header from "../components/Header.jsx";

const Home = () => {
  return (
    <>
      <Header title="Dashboard" />
      <div className="content">
        <div className="card">
          <h2>Upcoming Events</h2>
        </div>
        <div className="card">
          <h2>Your Clubs</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
