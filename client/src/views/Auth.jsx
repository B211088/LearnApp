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
        <div className="landing-inner flex sm:flex-row flex-col px-[10px] sm:gap-[100px] gap-[10px]">
          <div className="sm:h-[300px] h-[100px]">
            <h1 className="text-5xl mb-2 font-bold">LEARN APP</h1>
            <h4 className="text-2xl mb-3">Quản lý các khóa học của bạn</h4>
          </div>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
