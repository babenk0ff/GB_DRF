import React from 'react';
import Table from "react-bootstrap/Table";
import UserItem from "./UserItem";

const UserList = ({users}) => {
    return (
        <div>
            <Table striped>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>email</th>
                </tr>
                </thead>
                <tbody>
                    {users.map((user) => <UserItem key={user.email} user={user}/>)}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;