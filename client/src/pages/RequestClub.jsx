import "../assets/css/request_club.css"
import {useState} from "react";

const RequestClub = () => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [fMembers, setFMembers] = useState("");
  const [resources, setResources] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <h1>Request New Club</h1>
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
      </form>

      <h1>Your Requests</h1>

    </>
  )
}


export default RequestClub;