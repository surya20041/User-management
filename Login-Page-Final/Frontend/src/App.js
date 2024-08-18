import React, { useState } from "react";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";

export const userContext = React.createContext();

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [usersData, setUsersData] = useState([]);

  return (
    <userContext.Provider
      value={{
        usersData,
        setUsersData,
        setUserLoggedIn,
        setIsLogin,
        setLoggedInUser,
        userLoggedIn
      }}
    >
      {isLogin ? (
        userLoggedIn ? (
          <Dashboard />
        ) : (
          <SignIn />
        )
      ) : (
        <SignUp setIsLogin={setIsLogin} />
      )}
    </userContext.Provider>
  );
};

export default App;
