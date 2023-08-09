import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  return (
    <Navbar expand="lg" className="mb-5" data-bs-theme="dark" bg="dark">
      <div className="container">
        <Navbar.Brand className="text-white">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"/home"} className="text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/calendar"} className="text-white">
              Calendar
            </Nav.Link>
            <Nav.Link as={Link} to={"/login"} className="text-white">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to={"/register"} className="text-white">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
