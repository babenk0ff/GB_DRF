import React from 'react';
import Table from "react-bootstrap/Table";
import TodoItem from "./TodoItem";

const TodoList = ({todos}) => {
    return (
        <div>
            <Table striped>
                <thead>
                <tr>
                    <th>Project</th>
                    <th>Body</th>
                    <th>User</th>
                    <th>Status</th>
                    <th>Created at</th>
                </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => <TodoItem key={todo.createdAt} todo={todo}/>)}
                </tbody>
            </Table>
        </div>
    );
};

export default TodoList;