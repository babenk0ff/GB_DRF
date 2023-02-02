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


class App extends React.Component {
    serverAddr = 'http://192.168.28.129:8000';
    // serverAddr = 'http://localhost:8000';
    // serverAddr = 'http://192.168.1.7:8000';

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
        cookies.set('token', token);
        cookies.set('username', username);
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

        axios.get(this.serverAddr + '/api/users', {headers})
            .then(response => this.setState({'users': response.data.results}))
            .catch(error => {
                console.log(error)
                this.setState({users: []})
            })

        axios.get(this.serverAddr + '/api/projects', {headers})
            .then(response => this.setState({'projects': response.data.results}))
            .catch(error => {
                console.log(error)
                this.setState({projects: []})
            })

        axios.get(this.serverAddr + '/api/todos', {headers})
            .then(response => this.setState({'todos': response.data.results}))
            .catch(error => {
                console.log(error);
                this.setState({todos: []})
            })
    }

    get_token(username, password) {
        axios.post(this.serverAddr + '/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.setToken(response.data.token, username)
            })
            .catch(() => alert('Неверный логин или пароль'))
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

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <NavbarItem
                        isAuth={() => this.isAuthenticated()}
                        logout={() => this.logout()}
                        username={this.state.username}
                    />
                    <Container fluid="md">
                        <Routes>
                            <Route path='/' element={<Navigate to='/login' />}/>}/>
                            <Route path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path='/users' element={<UserList users={this.state.users}/>}/>
                            <Route path='/todos' element={<TodoList todos={this.state.todos}/>}/>
                            <Route path='/login' element={
                                <LoginFormItem
                                    get_token={(username, password) => this.get_token(username, password)}
                                    isAuth={() => this.isAuthenticated()}
                                />
                            }/>
                            <Route path='*' element={<NotFound404/>}/>
                        </Routes>
                    </Container>
                    <Footer/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
