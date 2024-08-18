import React, { useState, useEffect, useContext } from "react";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";

const EditUserModal = ({ user, setIsEditingUser, setUsersData }) => {
  const [mailID, setMailID] = useState("");
  const [userName, setUsername] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setMailID(user.mailID);
      setUsername(user.userName);
      setPassWord(user.passWord);
      setConfirmPassword(user.passWord); // initialize with existing password
      setRole(user.role);
    }
  }, [user]);

  const handleUpdateUser = async () => {
    if (passWord !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const updatedUser = { id: user.id, mailID, userName, passWord, role };

      const response = await fetch("http://localhost:8080/updateuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const userData = await response.json();
      setUsersData((prevUsersData) =>
        prevUsersData.map((u) => (u.id === userData.id ? userData : u))
      );

      setIsEditingUser(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <InputBox
        labelFor="E-Mail"
        type="email"
        value={mailID}
        onchange={(e) => setMailID(e.target.value)}
      />
      <InputBox
        labelFor="Username"
        type="text"
        value={userName}
        onchange={(e) => setUsername(e.target.value)}
      />
      <InputBox
        labelFor="Password"
        type="password"
        value={passWord}
        onchange={(e) => setPassWord(e.target.value)}
      />
      <InputBox
        labelFor="Confirm Password"
        type="password"
        value={confirmPassword}
        onchange={(e) => setConfirmPassword(e.target.value)}
      />
      <label htmlFor="role">Role</label>
      <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="maker">Maker</option>
        <option value="checker">Checker</option>
        <option value="admin">Admin</option>
      </select>
      <Button name={"Update"} size="small" onclick={handleUpdateUser} />
    </div>
  );
};

export default EditUserModal;
