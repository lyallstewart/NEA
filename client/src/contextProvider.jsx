import { useState } from "react";
import { ClubsContext, UserContext } from "./context.jsx";

const ContextProvider = ({ children }) => {
  const userInitialState = { isAuth: false, user: {} };
  const clubsInitialState = { user: null, memberClubs: [], otherClubs: [] };

  const [user, setUser] = useState(userInitialState);
  const [clubs, setClubs] = useState(clubsInitialState);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ClubsContext.Provider value={{ clubs, setClubs }}>
        {children}
      </ClubsContext.Provider>
    </UserContext.Provider>
  );
};

export default ContextProvider;
