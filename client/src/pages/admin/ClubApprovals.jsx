import { useEffect, useState } from "react";
import axios from "axios";
import {
  BiCheckCircle,
  BiCheckSquare,
  BiErrorCircle,
  BiMessageX,
} from "react-icons/bi";
import Header from "../../components/Header.jsx";

const ClubApprovals = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${import.meta.env.VITE_BASE_URL}/requests/all`,
    }).then((res) => {
      setRequests(res.data.requests);
    });
  };

  const handleApprove = (id) => {
    axios({
      method: "POST",
      withCredentials: true,
      url: `${import.meta.env.VITE_BASE_URL}/requests/approve/${id}`,
      body: {},
    }).then((res) => {
      getRequests();
    });
  };

  const handleDecline = (id) => {
    axios({
      method: "POST",
      withCredentials: true,
      url: `${import.meta.env.VITE_BASE_URL}/requests/decline/${id}`,
      data: {},
    }).then((res) => {
      getRequests();
    });
  };

  return (
    <>
      <Header title="Club Approvals" />
      <div className="content">
        <h2>Pending Approvals</h2>
        {requests.filter((r) => r.isPending).length > 0 ? (
          requests
            .filter((r) => r.isPending)
            .map((r) => (
              <div className="club-request-entry" key={r.id}>
                <div className="club-request-header">
                  <h3>
                    {r.name + " "}
                    <span>
                      by {r.founders} (submitted by {r.submitting_user})
                    </span>
                  </h3>
                  <div className="club-request-btns">
                    <div
                      className="club-request-approve-btn"
                      onClick={() => handleApprove(r.id)}
                    >
                      <BiCheckSquare className="club-request-icon" />
                      <p>Approve</p>
                    </div>
                    <div
                      className="club-request-decline-btn"
                      onClick={() => handleDecline(r.id)}
                    >
                      <BiMessageX className="club-request-icon" />
                      <p>Decline</p>
                    </div>
                  </div>
                </div>
                <div className="club-request-content">
                  <p className="club-request-field">
                    <p>Summary</p>
                    {r.topic}
                  </p>
                  <p className="club-request-field">
                    <p>Resources Needed</p>
                    {r.resources}
                  </p>
                  <p className="club-request-field">
                    <p>Meeting times</p>
                    {r.meeting}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <div className="card">
            <p>Nothing to display.</p>
          </div>
        )}
        <h2>Completed Approvals</h2>
        {requests.filter((r) => !r.isPending).length > 0 ? (
          requests
            .filter((r) => !r.isPending)
            .map((r) => (
              <div className="club-request-entry" key={r.id}>
                <div className="club-request-header">
                  <h3>
                    {r.name + " "}
                    <span>
                      by {r.founders} (submitted by {r.submitting_user})
                    </span>
                  </h3>
                  <div className="club-request-btns">
                    {r.isApproved ? (
                      <p className="club-request-status club-request-approved">
                        <BiCheckCircle className="icon" />
                        Approved
                      </p>
                    ) : (
                      <p className="club-request-status club-request-declined">
                        <BiErrorCircle className="icon" />
                        Not Approved
                      </p>
                    )}
                  </div>
                </div>
                <div className="club-request-content">
                  <p className="club-request-field">
                    <p>Summary</p>
                    {r.topic}
                  </p>
                  <p className="club-request-field">
                    <p>Resources Needed</p>
                    {r.resources}
                  </p>
                  <p className="club-request-field">
                    <p>Meeting times</p>
                    {r.meeting}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <div className="card">
            <p>Nothing to display.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ClubApprovals;
