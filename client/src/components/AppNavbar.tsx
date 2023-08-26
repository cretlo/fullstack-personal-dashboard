import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";
import { useAxiosContext } from "../contexts/AxiosContext";

const AppNavbar = () => {
  const authContext = useAuthContext();
  const { customAxios } = useAxiosContext();

  const { logout } = authContext;
  const { isAuthenticated, user } = authContext.state;

  async function handleLogout() {
    try {
      await customAxios.delete("/api/auth");
    } catch (err) {
      console.error(err);
    }
    logout();
  }

  const authLinks = (
    <>
      <Nav.Link as={Link} to={"/"} className="text-white">
        Home
      </Nav.Link>
      <Nav.Link as={Link} to={"/calendar"} className="text-white">
        Calendar
      </Nav.Link>
      <button
        onClick={() => handleLogout()}
        className="ms-lg-3 btn btn-outline-light"
      >
        Logout
      </button>
    </>
  );

  const guestLinks = (
    <>
      <Nav.Link as={Link} to={"/login"} className="text-white">
        Login
      </Nav.Link>
      <Nav.Link as={Link} to={"/register"} className="text-white">
        Register
      </Nav.Link>
    </>
  );

  return (
    <Navbar expand="lg" className="mb-5" data-bs-theme="dark" bg="dark">
      <div className="container">
        <Navbar.Brand
          as={Link}
          to={isAuthenticated ? "/" : "/login"}
          className="text-white"
        >
          Planner
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
