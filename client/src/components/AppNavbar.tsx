import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

const AppNavbar = () => {
  const authContext = useAuthContext();

  const { logout } = authContext;
  const { isAuthenticated, user } = authContext.state;

  //useEffect(() => {
  //  loadUser();
  //});

  const authLinks = (
    <>
      <Nav.Link as={Link} to={"/"} className="text-white">
        Home
      </Nav.Link>
      <Nav.Link as={Link} to={"/calendar"} className="text-white">
        Calendar
      </Nav.Link>
      <div className="vr bg-white" />
      <Nav.Link onClick={() => logout()} className="text-white">
        <span>Welcome {user?.username} </span>Logout
      </Nav.Link>
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
        <Navbar.Brand className="text-white">Dashboard</Navbar.Brand>
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
