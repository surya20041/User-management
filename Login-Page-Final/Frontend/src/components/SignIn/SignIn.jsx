import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import { MD5 } from "crypto-js";
import styles from "./SignIn.module.css";
import logo from './Designer.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const { usersData, setUsersData, setUserLoggedIn, setLoggedInUser, userLoggedIn } = useContext(userContext);

  useEffect(() => {
    fetch("http://localhost:8080/getusersdata")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched users data:", data); // Check console for user data structure
            setUsersData(data); // Update usersData state
        })
        .catch(error => console.error("Error fetching user data:", error));
}, [setUsersData]);

  


const validateCredentials = () => {
  console.log("Validating credentials...");
  if (userName.trim().length === 0 || password.length === 0) {
      setStatus("Please enter username and password");
      return;
  }

  const user = usersData.find(user => user.userName === userName.trim());
  console.log('User found:', user); // Log the user object

  if (!user) {
      setStatus("User not found");
      return;
  }

  const hashedPassword = MD5(password).toString();
  console.log("Hashed password:", hashedPassword);
  console.log("User isActive status:", user.isActive); // Log isActive status

  if (hashedPassword === user.passWord) {
      if (user.isActive) {
          setUserLoggedIn(true);
          setLoggedInUser(userName);
          setStatus("");
          console.log("User logged in successfully");
      } else {
          setStatus("User is not active. Please contact support.");
          console.log("User is not active");
      }
  } else {
      setStatus("Username or password is incorrect.");
      console.log("Username or password is incorrect");
  }
};
return userLoggedIn ? null : (
  <body>
    <section className={`${styles.main} col-12`}>
      <div className={styles.container}>
        <div className={styles.row}>
        <div className={`${styles.text} col-12 col-lg-6`}>
        <h1 className={styles.heading}>User Management</h1> {/* Added this line */}
          <section className={styles.mainbx}>
      
        {/* <img src={logo} alt={logo}></img> */}

        <form>
					<div className={`${styles.formGroup} mt-4 mb-3`}>
        
          <h1 className={styles.heading}>Sign In</h1>
            <InputBox
              labelFor="Username"
              type="text"
              onchange={(e) => setUsername(e.target.value)}
            />
            </div>
            <InputBox
              labelFor="Password"
              type="password"
              onchange={(e) => setPassword(e.target.value)}
            />
            <div className={`${styles.belowlinks} mt-4`}>
            <Button name={"Sign In"} size="small" onclick={validateCredentials} />
            <p>{status}</p>
            </div>
        
          
        </form>
     

      </section>
      </div>
      </div>
      </div>
    </section>
  </body>



    
  );
};
 

			

export default SignIn;
