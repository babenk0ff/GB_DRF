import React from "react";


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
        </tr>
    )
}

export default UserItem
