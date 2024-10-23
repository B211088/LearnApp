import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../Layout/AlertMessage";

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);

  const navigate = useNavigate();
  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    comfirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password, comfirmPassword } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();
    if (password !== comfirmPassword) {
      setAlert({ type: "danger", message: "Password do not match" });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        navigate("/login");
      } else {
        setAlert({ type: "danger", message: registerData.message });
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
        onSubmit={register}
        className="my-4 bg-white sm:w-[26%] sm:min-w-[300px] sm:max-w-[360px] w-full min-w-[290px] px-[20px] py-[20px] rounded-[5px]"
      >
        <AlertMessage className="mt-[20px]" info={alert} />
        <h1 className=" text-black font-bold text-[1.6rem] ">Đăng ký</h1>
        <Form.Group>
          <Form.Control
            className="h-[40px] mt-[20px] text-[0.9rem] outline-none rounded-[5px]"
            type="text"
            placeholder="Nhập tài khoản"
            name="username"
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            className="h-[40px] mt-[20px] text-[0.9rem] outline-none rounded-[5px]"
            type="password"
            placeholder="Nhập Mật khẩu"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="mt-[10px]">
          <Form.Control
            className="h-[40px] mt-[20px] text-[0.9rem] outline-none rounded-[5px]"
            type="password"
            placeholder="Nhập lại mật khẩu"
            name="comfirmPassword"
            required
            value={comfirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button className="mt-[30px] w-full" variant="success" type="submit">
          Register
        </Button>

        <p className="mt-[40px] text-black text-[0.8rem]">
          Bạn đã có tài khoản?
          <Link to="/login ">
            <Button variant="info" size="sm" className="ml-2">
              Đăng nhập
            </Button>
          </Link>
        </p>
      </Form>
    </>
  );
};

export default RegisterForm;
