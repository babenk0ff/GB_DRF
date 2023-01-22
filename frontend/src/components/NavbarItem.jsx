import React from "react";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarItem() {
    return (
        <div>
            <Navbar className="mb-2" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="">
                        <img
                            src="/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt=""
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Link className="nav-link" to='/'>Projects</Link>
                        <Link className="nav-link" to='/users'>Users</Link>
                        <Link className="nav-link" to='/todos'>ToDo</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarItem