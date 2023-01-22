import React from 'react';

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.project.name}</td>
            <td>{todo.body}</td>
            <td>{todo.user.username}</td>
            <td>{todo.isActive ? 'In progress' : 'Completed'}</td>
            <td>
                {
                    new Date(todo.createdAt).toLocaleDateString('en-US') + ', ' +
                    new Date(todo.createdAt).toLocaleTimeString('en-US')
                }
            </td>
        </tr>
    );
};

export default TodoItem;
