import React from 'react';
import Table from "react-bootstrap/Table";
import TodoItem from "./TodoItem";
import {Link} from "react-router-dom";
import {Stack} from "react-bootstrap";

const TodoList = ({todos, completeTodo}) => {
    todos = todos.filter(todo => todo.isActive !== false);
    return (
        <div>
            <Stack direction="horizontal" gap={3} className="mb-3 ms-1 me-2">
                <h3 className="me-auto">ToDo list</h3>
                <Link className="btn btn-outline-primary" to="/todos/create">Create ToDo</Link>
            </Stack>
            {todos.length > 0 && (
                <Table striped>
                    <thead>
                    <tr>
                        <th>Project</th>
                        <th>Body</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Created at</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => <TodoItem
                            todo={todo}
                            completeTodo={completeTodo}
                            key={todo.createdAt}
                        />)}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default TodoList;