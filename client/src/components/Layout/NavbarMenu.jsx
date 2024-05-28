import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser
  } = useContext(AuthContext);

  const logout = () => logoutUser();


  return (
    <Navbar
      expand="lg"
      bg="primary"
      variant="dark"
      className="shadow px-4 py-2 "
    >
      <Navbar.Brand className="font-weight-bolder text-white flex items-center">
        <img
          src={learnItLogo}
          alt="learnItLogo"
          className="w-[32px] h-[32px] "
        />
        LearnIt
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
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              className="w-[40px] h-[32px]"
            />
            Logout
          </Button>
        </Nav>
      </NavbarCollapse>
    </Navbar>
  );
};

export default NavbarMenu;
