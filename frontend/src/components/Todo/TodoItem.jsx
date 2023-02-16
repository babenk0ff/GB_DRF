import React from 'react';
import Button from "react-bootstrap/Button";

const TodoItem = ({todo, completeTodo}) => {
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
            <td>
                <Button variant="outline-success" onClick={() => completeTodo(todo.id)}>Mark completed</Button>
            </td>
        </tr>
    );
};

export default TodoItem;
