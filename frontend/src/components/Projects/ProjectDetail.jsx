import React from 'react';
import {useLocation} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import UserList from "../Users/UserList";
import TodoList from "../Todo/TodoList";

const ProjectDetail = ({todos, completeTodo}) => {
    const project = useLocation().state;

    return (
        <Container>
            <Row className="p-3 mb-3 rounded" style={{backgroundColor: 'cornflowerblue'}}>
                <h2>{project.name}</h2>
            </Row>
            <Row className="rounded border pb-3 mb-3">
                <h3 className="p-3">Repository link</h3>
                <a href="/#" className="text-decoration-none" >{project.repoLink}</a>
            </Row>
            <Row className="rounded border mb-3">
                {/*<h3 className="p-3">Users</h3>*/}
                <UserList users={project.users}/>
            </Row>
            <Row className="rounded border mb-3 pt-3">
                {/*<h3 className="p-3">ToDo</h3>*/}
                <TodoList
                    todos={todos.filter(todo => todo.project.id === project.id)}
                    completeTodo={completeTodo}/>
            </Row>
        </Container>
    );
};

export default ProjectDetail;