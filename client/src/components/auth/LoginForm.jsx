import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../Layout/AlertMessage";

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);
  // Router

  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form
        className="my-4 bg-white sm:w-[26%] sm:min-w-[300px] sm:max-w-[360px] w-full min-w-[290px] px-[20px] py-[20px] rounded-[5px]"
        onSubmit={login}
      >
        <h1 className=" text-black font-bold text-[1.6rem] py-[10px] ">
          Đăng nhập
        </h1>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            className="h-[40px] mt-[30px] text-[0.9rem] outline-none rounded-[5px]"
            type="text"
            placeholder="Tên tài khoản"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="mt-[20px]">
          <Form.Control
            className="h-[40px] text-[0.9rem] outline-none rounded-[5px]"
            type="password"
            placeholder="Mật khẩu"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button className="mt-[50px] w-full" variant="success" type="submit">
          Login
        </Button>

        <p className="mt-[60px] text-black text-[0.8rem]">
          Bạn chưa có tài khoản?
          <Link to="/register">
            <Button variant="info" size="sm" className="ml-2 text-black">
              Đăng ký
            </Button>
          </Link>
        </p>
      </Form>
    </>
  );
};

export default LoginForm;
