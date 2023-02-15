import React from "react";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarItem({isAuth, logout, username}) {
    return (
        <div>
            <Navbar className="mb-3" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="">
                        <img
                            src="/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt=""
                        />
                        Project ToDo
                    </Navbar.Brand>
                    {isAuth() && (
                        <React.Fragment>
                            <Nav className="me-auto">
                                <Link className="nav-link" to='/projects'>Projects</Link>
                                <Link className="nav-link" to='/todos'>ToDo</Link>
                                <Link className="nav-link" to='/users'>Users</Link>
                            </Nav>
                            <Nav className="ml-auto">
                                <Link className="nav-link" to='/'>
                                    <span>{username}</span>
                                </Link>
                                <span className="navbar-divider">|</span>
                                <Link className="nav-link" to='/login'>
                                    <span onClick={logout}>Logout</span>
                                </Link>
                            </Nav>
                        </React.Fragment>
                    )}
                    {!isAuth() && (
                        <Nav className="ml-auto">
                            <Link className="nav-link" to='/login'>Login</Link>
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarItem
