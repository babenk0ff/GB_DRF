import React from "react";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Footer from "./components/Footer";
import ProjectList from "./components/Projects/ProjectList";
import UserList from "./components/Users/UserList";
import NavbarItem from "./components/NavbarItem";
import Container from "react-bootstrap/Container";
import TodoList from "./components/Todo/TodoList";
import NotFound404 from "./components/NotFound404";
import LoginFormItem from "./components/LoginFormItem";
import Cookies from "universal-cookie/es6";
import ProjectForm from "./components/Projects/ProjectForm";
import ProjectDetail from "./components/Projects/ProjectDetail";
import TodoForm from "./components/Todo/TodoForm";


class App extends React.Component {
    serverAddr = `http://192.168.127.128:8000`;
    // serverAddr = `http://192.168.28.129:8000`;
    // serverAddr = `http://localhost:8000`;

    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'username': '',
        };
    }

    setToken(token, username) {
        const cookies = new Cookies();
        cookies.set('token', token, {path: '/', maxAge: 2592000});
        cookies.set('username', username, {path: '/', maxAge: 2592000});
        this.setState({token: token, username: username}, () => this.loadData());
    }

    isAuthenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.setToken('', '')
    }

    getTokenFromStorage() {
        const cookies = new Cookies();
        const token = cookies.get('token')
        const username = cookies.get('username')
        if (token === undefined) {
            this.setState({token: ''}, () => this.loadData());
        } else {
            this.setState({token: token}, () => this.loadData());
            this.setState({username: username});
        }
    }

    loadData() {
        const headers = this.get_headers()

        axios.get(this.serverAddr + `/api/users`, {headers})
            .then(response => this.setState({'users': response.data.results}))
            .catch(error => {
                console.log(error)
                this.setState({users: []})
            })

        axios.get(this.serverAddr + `/api/projects`, {headers})
            .then(response => this.setState({'projects': response.data.results}))
            .catch(error => {
                console.log(error)
                this.setState({projects: []})
            })

        axios.get(this.serverAddr + `/api/todos`, {headers})
            .then(response => this.setState({'todos': response.data.results}))
            .catch(error => {
                console.log(error);
                this.setState({todos: []})
            })
    }

    get_token(username, password) {
        axios.post(this.serverAddr + `/api-token-auth/`, {username: username, password: password})
            .then(response => {
                this.setToken(response.data.token, username)
            })
            .catch((error) => {
                    alert('Неверный логин или пароль')
                    console.log(error)
                }
            )
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount() {
        this.getTokenFromStorage();
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(this.serverAddr + `/api/projects/${id}/`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((project) => project.id !== id)})
            })
            .catch(error => console.log(error))
    }

    createProject(name, repoLink) {
        const headers = this.get_headers()
        const data = {name: name, repoLink: repoLink}
        axios.post(this.serverAddr + `/api/projects/`, data, {headers})
            .then(response => {
                let new_project = response.data
                this.setState({projects: [...this.state.projects, new_project]})
            })
            .catch(error => console.log(error))
    }

    createTodo(project, body, user) {
        const headers = this.get_headers()
        const data = {project: project, body: body, user: user}
        axios.post(this.serverAddr + `/api/todos/`, data, {headers})
            .then(response => {
                if (response.status === 201) {
                    let new_todo = response.data;
                    this.setState({todos: [...this.state.todos, new_todo]});
                }
            })
            .catch(error => console.log(error))
    }

    completeTodo(id) {
        const headers = this.get_headers()
        axios.delete(this.serverAddr + `/api/todos/${id}/`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((todo) => todo.id !== id)})
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="App">
                <NavbarItem
                    isAuth={() => this.isAuthenticated()}
                    logout={() => this.logout()}
                    username={this.state.username}
                />
                <Container fluid="md">
                    <Routes>
                        <Route path='/' element={<Navigate to='/login'/>}/>}/>
                        <Route path='/projects/create' element={<ProjectForm
                            createProject={(name, repoLink) => this.createProject(name, repoLink)}/>}/>
                        <Route path='/projects' element={<ProjectList
                            projects={this.state.projects}
                            deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route path='/projects/:id' element={<ProjectDetail
                            todos={this.state.todos}
                            completeTodo={(id) => this.completeTodo(id)}/>}/>
                        <Route path='/users' element={<UserList users={this.state.users}/>}/>
                        <Route path='/todos' element={<TodoList
                            todos={this.state.todos}
                            completeTodo={(id) => this.completeTodo(id)}/>}/>
                        <Route path='/todos/create' element={<TodoForm
                            projects={this.state.projects}
                            users={this.state.users}
                            username={this.state.username}
                            createTodo={(project, body, user) => {
                                this.createTodo(project, body, user)
                            }}/>}/>
                        <Route path='/login' element={<LoginFormItem
                            get_token={(username, password) => this.get_token(username, password)}
                            isAuth={() => this.isAuthenticated()}/>}/>
                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>
                </Container>
                <Footer/>
            </div>
        )
    }
}

export default App;
