import {useParams} from "react-router";
import Header from "../components/Header.jsx";

const Club = () => {
  const {clubId} = useParams();

  return (
    <>
      <Header title="Club Title Placeholder"/>
      <div className="content">

      </div>
    </>
  )
}

export default Club;