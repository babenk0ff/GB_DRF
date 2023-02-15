import React from "react";


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
        </tr>
    )
}

export default UserItem
