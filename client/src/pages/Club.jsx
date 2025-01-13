import { useParams } from "react-router";
import Header from "../components/Header.jsx";

const Club = () => {
  const { id } = useParams();

  return (
    <>
      <Header title="Club Title Placeholder" />
      <div className="content">Club {id}</div>
    </>
  );
};

export default Club;
