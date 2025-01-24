import Header from "../../../components/Layout/Header.jsx";
import { memo, useState } from "react";
import TabButton from "../../../components/Shared/TabButton.jsx";

const UserManagement = () => {
  const [tab, setTab] = useState(1);

  let selectedTab;
  switch (tab) {
    case 1:
      selectedTab = (
        <>
          <h2>Current Users</h2>
        </>
      );
      break;
    case 2:
      selectedTab = (
        <>
          <h2>Allowlist</h2>
        </>
      );
      break;
  }

  return (
    <>
      <Header title="User Management">
        <div className="tab-group">
          <TabButton
            title="Current Users"
            index={1}
            isActive={tab === 1}
            setIsActive={() => setTab(1)}
          />
          <TabButton
            title="Manage Allowlist"
            index={2}
            isActive={tab === 2}
            setIsActive={() => setTab(2)}
          />
        </div>
      </Header>
      <div className="content">{selectedTab}</div>
    </>
  );
};

/* Memoisation stops re-rendering even if parents change, unless props change.
Useful here because component includes the large get all users request, and the number of times this is called should be minimised.
 */
export default memo(UserManagement);
