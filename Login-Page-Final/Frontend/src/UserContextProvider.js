// UserContextProvider.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  // Other context state and methods as needed

  return (
    <UserContext.Provider
      value={{
        usersData,
        setUsersData,
        userLoggedIn,
        setUserLoggedIn,
        loggedInUser,
        setLoggedInUser,
        // other context values
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
