import React from "react";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Footer from "./components/Footer";
import ProjectList from "./components/Projects/ProjectList";
import UserList from "./components/Users/UserList";
import NavbarItem from "./components/NavbarItem";
import Container from "react-bootstrap/Container";
import TodoList from "./components/Todo/TodoList";
import NotFound404 from "./components/NotFound404";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://localhost:8000/api/projects')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://localhost:8000/api/todos')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <NavbarItem/>
                    <Container fluid="md">
                        <Routes>
                            <Route path='/' element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path='/users' element={<UserList users={this.state.users}/>}/>
                            <Route path='/todos' element={<TodoList todos={this.state.todos}/>}/>
                            <Route path='*' element={<NotFound404 />} />
                        </Routes>
                    </Container>
                    <Footer/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
