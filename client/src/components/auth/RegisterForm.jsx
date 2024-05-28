import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate} from "react-router-dom";
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
        navigate("/login")
      }
      else{
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
      <Form onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            type="password"
            placeholder="Comfirm Password"
            name="comfirmPassword"
            required
            value={comfirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button className="mt-3" variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p className="mt-3">
        Elready have an account?
        <Link to="/login ">
          <Button variant="info" size="sm" className="ml-2">
            login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
