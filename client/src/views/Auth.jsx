import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";

const Auth = ({ authRoute }) => {
  const navigate = useNavigate();
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  let body;

  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else {
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  }

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="text-5xl mb-2">LearnTt</h1>
          <h4 className="text-2xl mb-3">Keep track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
