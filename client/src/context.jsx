// Context provides a means of accessing data from any component, regardless of its location in the tree.
import {createContext, useState} from 'react';

export const UserContext = createContext({})
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({isAuth: false, user: {}});

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}