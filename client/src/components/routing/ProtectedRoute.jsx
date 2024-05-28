
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../Layout/NavbarMenu";

const ProtectedRoute = () => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavbarMenu />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
