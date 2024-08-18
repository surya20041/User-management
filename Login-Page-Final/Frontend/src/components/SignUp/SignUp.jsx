import React, { useContext, useState } from "react";
import { userContext } from "../../App";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import { MD5 } from "crypto-js";

const SignUp = ({ setIsLogin }) => {
  const [mailID, setMailID] = useState("");
  const [userName, setUsername] = useState("");
  const [passWord, setPassWord] = useState("");
  const [role, setRole] = useState("maker"); // Default to "maker"
  const [mailIDStatus, setMailIDStatus] = useState("");
  const [userNameStatus, setUserNameStatus] = useState("");
  const [passWordStatus, setPassWordStatus] = useState("");
  const [roleStatus, setRoleStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { usersData, setUsersData } = useContext(userContext);

  const onSignUp = async () => {
    try {
      const bodyData = JSON.stringify({
        mailID,
        userName,
        passWord,
        role,
      });

      const response = await fetch("http://localhost:8080/addnewuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const userData = await response.json();
      setUsersData((prevUsersData) => [...prevUsersData, userData]);
      setMailID("");
      setUsername("");
      setPassWord("");
      setRole("maker");
      setErrorMessage("");

      // Close the SignUp modal
      setIsLogin(false);
    } catch (error) {
      console.error("Error storing user data:", error);
      setErrorMessage("Failed to sign up. Please try again.");
    }
  };

  const validateFields = () => {
    if (
      mailID.length > 0 &&
      userName.length > 0 &&
      passWord.length > 0 &&
      role.length > 0
    ) {
      return true;
    }
    setErrorMessage("Please fill all the fields");
    return false;
  };

  const validateEmail = (mail) => {
    if (mail.length === 0) {
      setMailIDStatus("");
      return;
    }
    if (usersData.find((user) => user.mailID === mail)) {
      setMailIDStatus("Mail already exists");
      return;
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(mail)) {
      setMailIDStatus("Please enter valid EMail-ID");
      return;
    }
    setMailIDStatus("");
    setMailID(mail);
  };

  const validateUsername = (userName) => {
    if (userName.length === 0) {
      setUserNameStatus("");
      return;
    }
    const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!regex.test(userName)) {
      setUserNameStatus("Pattern Not Matched");
      return;
    }
    if (usersData.find((user) => user.userName === userName)) {
      setUserNameStatus("Username already exists");
      return;
    }
    setUserNameStatus("");
    setUsername(userName);
  };

  const validatePassword = (passWord) => {
    if (passWord.length === 0) {
      setPassWordStatus("");
      return;
    }
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!regex.test(passWord)) {
      setPassWordStatus(
        "Password should be at least 8 characters long and should contain at least one digit, lowercase character, uppercase character and special character each"
      );
      return;
    }
    setPassWordStatus("");
    const md5Hash = MD5(passWord).toString();
    setPassWord(md5Hash);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSignUp = () => {
    if (validateFields()) {
      onSignUp();
    }
  };

  return (
    <div>
      <h1>Set Up Your Account</h1>
      <InputBox
        labelFor="E-Mail"
        type="email"
        onchange={(e) => validateEmail(e.target.value)}
      />
      {mailIDStatus.length > 0 && <p>{mailIDStatus}</p>}
      <InputBox
        labelFor="Username"
        type="text"
        onchange={(e) => validateUsername(e.target.value)}
      />
      {userNameStatus.length > 0 && <p>{userNameStatus}</p>}
      <InputBox
        labelFor="Password"
        type="password"
        onchange={(e) => validatePassword(e.target.value)}
      />
      {passWordStatus.length > 0 && <p>{passWordStatus}</p>}
      <label htmlFor="role">Role</label>
      <select id="role" value={role} onChange={handleRoleChange}>
        <option value="maker">Maker</option>
        <option value="checker">Checker</option>
        <option value="admin">Admin</option>
      </select>
      {roleStatus.length > 0 && <p>{roleStatus}</p>}
      <Button
        name={"Sign Up"}
        size="small"
        onclick={handleSignUp}
      />
      <p>{errorMessage}</p>
    </div>
  );
};

export default SignUp;
