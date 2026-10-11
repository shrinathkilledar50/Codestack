import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

const NavBar = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" variant="light">
                <Container>
                    <Navbar.Brand href="/home">Code Stack</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                            <NavDropdown title="Register" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={NavLink} to="/guestLayout/user">User Register</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/guestLayout/techExpert">Tech Expert Register</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Login" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={NavLink} to="/guestLayout/UserLogin">User Login</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/guestLayout/adminlogin">Admin Login</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/guestLayout/techExpertLogin">Tech Expert Login</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={NavLink} to="/codeStack">Code Stack</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

export default NavBar
