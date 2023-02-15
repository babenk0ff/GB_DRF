import React from 'react';
import Table from "react-bootstrap/Table";
import UserItem from "./UserItem";
import {Stack} from "react-bootstrap";

const UserList = ({users}) => {
    return (
        <div>
            <Stack direction="horizontal" gap={3} className="mb-3 ms-1 me-2 pt-3">
                <h3 className="me-auto">Users list</h3>
            </Stack>
            {users.length > 0 && (
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
            )}
        </div>
    );
};

export default UserList;