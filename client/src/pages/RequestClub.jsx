import "../assets/css/request_club.css"

const RequestClub = () => {
  return (
    <>
      <h1>Request New Club</h1>
      <form id="club-request-form">
        <div className="input-group">
          <label htmlFor="name">Club Name</label>
          <input required type='text' placeholder='Code Club' name="name"/>
        </div>
        <div className="input-group">
          <label htmlFor="topic">Club Topic</label>
          <input required type='text' placeholder='Work on group programming projects' name="topic"/>
        </div>
        <div className="input-group">
          <label htmlFor="name">Do you need any additional resources?</label>
          <input required type='textarea' placeholder='School laptops.' name="resources"/>
        </div>
        <div className="input-group">
          <label htmlFor="name">When will you meet?</label>
          <input required type='text' placeholder='Once a week on Thursdays' name="times"/>
        </div>
        <input className="btn-primary" type="submit" value="Request Club" />
      </form>

      <h1>Your Requests</h1>

    </>
  )
}



export default RequestClub;