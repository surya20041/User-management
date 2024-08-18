import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import Button from "../Button/Button";
import SignUp from "../SignUp/SignUp";
import EditUserModal from "../EditUserModal/EditUserModal";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UserList = () => {
    const { setIsLogin, usersData, setUsersData, setUserLoggedIn } = useContext(userContext);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") {
            setIsLogin(true);
        } else {
            setUserLoggedIn(true);
        }
    }, [setIsLogin, setUserLoggedIn]);

    useEffect(() => {
        fetch("http://localhost:8080/getusersdata")
            .then(response => response.json())
            .then(data => setUsersData(data))
            .catch(error => console.error("Error fetching user data:", error));
    }, [setUsersData]);

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsEditingUser(true);
    };

    const handleToggleActivation = async (user) => {
        try {
            const response = await fetch(`http://localhost:8080/updateuseractivation/${user.id}?isActive=${!user.active}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const updatedUser = await response.json();
            console.log('Updated user:', updatedUser);

            setUsersData((prevUsersData) =>
                prevUsersData.map((u) => (u.id === updatedUser.id ? updatedUser : u))
            );
        } catch (error) {
            console.error("Error toggling user activation:", error);
        }
    };

    const renderToggleButton = (user) => {
        return user.active ? 'Deactivate' : 'Activate';
    };

    const handleSignOut = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInUser");
        setUserLoggedIn(false);
        setIsLogin(true);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">User List</h1>
            <table className="table table-striped table-hover text-center">
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">E-Mail</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.userName}</td>
                            <td>{user.mailID}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button
                                    name={renderToggleButton(user)}
                                    size="small"
                                    className={user.active ? "btn btn-danger" : "btn btn-success"}
                                    onclick={() => handleToggleActivation(user)}
                                />
                                <Button
                                    name={"Edit"}
                                    size="small"
                                    className="btn btn-primary ml-2"
                                    onclick={() => handleEditUser(user)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Button
                name={"Add New User"}
                size="small"
                className="mt-3 btn btn-success"
                onclick={() => setIsAddingUser(true)}
            />

            <Modal
                show={isAddingUser}
                onHide={() => setIsAddingUser(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignUp setIsLogin={setIsAddingUser} />
                </Modal.Body>
            </Modal>

            <Modal
                show={isEditingUser}
                onHide={() => setIsEditingUser(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditUserModal user={selectedUser} onClose={() => setIsEditingUser(false)} />
                </Modal.Body>
            </Modal>

            <Button
                name={"Sign Out"}
                size="small"
                className="mt-3 btn btn-warning"
                onclick={handleSignOut}
            />
        </div>
    );
};

export default UserList;
