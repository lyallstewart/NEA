import Header from "../../components/Header.jsx";

const UserManagement = () => {
  return (
    <>
      <Header title="User Management" />
      <div className="content">
        <div className="card">
          <h2>Manage Allowlist</h2>
          <h3>Allowlist Settings</h3>
          <h3>Allowlist Import</h3>
          <h3>Manual Allowlist</h3>
        </div>
        <div className="card">
          <h2>Manage Existing Users</h2>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
