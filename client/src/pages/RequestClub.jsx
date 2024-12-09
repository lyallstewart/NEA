import "../assets/css/request_club.css"

import { BiErrorCircle, BiTimeFive, BiCheckCircle } from "react-icons/bi";

import {useEffect, useState} from "react";
import axios from "axios";
import Header from "../components/Header.jsx";

const RequestClub = () => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [fMembers, setFMembers] = useState("");
  const [resources, setResources] = useState("");
  const [time, setTime] = useState("");
  const [msg, setMsg] = useState("");
  const [msgIsError, setMsgIsError] = useState(false);
  const [userReqs, setUserReqs] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      withCredentials: true,
      data: {
        name,
        summary,
        fMembers,
        resources,
        time
      },
      url: `${import.meta.env.VITE_BASE_URL}/requests/submit/`,
    }).then(res => {
      setMsgIsError(false);
      setMsg("Submitted successfully")
      setSummary("")
      setFMembers("")
      setResources("")
      setTime("")
      setName("")
      getRequests();
    }).catch(err => {
      setMsgIsError(true);
      setMsg("Something went wrong!")
    })
  }

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: `${import.meta.env.VITE_BASE_URL}/requests/getByUser`
    }).then(res => {
      if(res.data.success) {
        setUserReqs(res.data.requests);
      }
    }).catch(err => {

    })
  }

  return (
    <>
      <Header title="Club Requests" />
      <div className="content">
        <h2>Request New Club</h2>
        <form id="club-request-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Club name</label>
            <input
              required
              type='text'
              placeholder='Code Club'
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="topic">Club summary</label>
            <input
              required
              type="text"
              placeholder="Work on group programming projects"
              name="topic"
              value={summary}
              onChange={e => setSummary(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="topic">Who are your founding members?</label>
            <input
              required
              type='text'
              placeholder='Joe Rowing, Melanie Dennig, ...'
              name="topic"
              value={fMembers}
              onChange={e => setFMembers(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Do you need any additional resources?</label>
            <input
              required
              type='textarea'
              placeholder='School laptops.'
              name="resources"
              value={resources}
              onChange={e => setResources(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">When will you meet?</label>
            <input
              required
              type='text'
              placeholder='Once a week on Thursdays'
              name="times"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
          </div>
          <input className="btn-primary" type="submit" value="Request Club"/>
        <p className={msgIsError ? "form-error" : "form-success"}>{msg}</p>
        </form>

        <h2>Your Requests</h2>
        {
          userReqs?.length > 0 ? (
            userReqs.map(req => <ClubRequestEntry request={req} key={req.id} />)
          ) : (
            <p>Nothing to display.</p>
          )
        }
      </div>
    </>
  )
}

const ClubRequestEntry = ({request}) => {
  const {name, topic, founders, resources, meeting, isPending, isApproved, isDeclined} = request;

  let status;
  if(isPending) {
    status = <p className="club-request-status club-request-pending"><BiTimeFive className="icon"/>Pending</p>
  } else if (isApproved) {
    status = <p className="club-request-status club-request-approved"><BiCheckCircle className="icon"/>Approved</p>
  } else if (isDeclined) {
    status = <p className="club-request-status club-request-declined"><BiErrorCircle className="icon"/>Not Approved</p>
  }

  return (
    <div className="club-request-entry">
      <div className="club-request-header">
        <h3>{name} <span>by {founders}</span></h3>
        { status }
      </div>
      <div className="club-request-content">
        <p className="club-request-field"><p>Summary</p>{topic}</p>
        <p className="club-request-field"><p>Resources Needed</p>{resources}</p>
        <p className="club-request-field"><p>Meeting times</p>{meeting}</p>
      </div>
    </div>
  )
}

export default RequestClub;