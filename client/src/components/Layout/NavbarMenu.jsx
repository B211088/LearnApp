import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const NavbarMenu = () => {
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      logout();
    }
  };
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const logout = () => logoutUser();

  return (
    <Navbar expand="lg" variant="dark" className="shadow px-4 py-2 bg-black ">
      <Navbar.Brand className="font-weight-bolder text-white flex items-center">
        <i className="fa-solid fa-graduation-cap"></i>
        <p className="ml-[5px] font-bold">LEARN APP</p>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <NavbarCollapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="text-white font-bold" to="/dashboard" as={Link}>
            Dashboard
          </Nav.Link>
          <Nav.Link className="text-white font-bold" to="/about" as={Link}>
            About
          </Nav.Link>
        </Nav>

        <Nav className="flex items-center">
          <Nav.Link className="text-white font-bold" disabled>
            {username}
          </Nav.Link>
          <Button
            variant="secondary"
            className="font-bold text-white flex items-center"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </Button>
        </Nav>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavbarMenu;
