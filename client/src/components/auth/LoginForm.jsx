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

  const [alert, setAlert] = useState(null)

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success){
        setAlert({type: 'danger', message: loginData.message})
        setTimeout(() => {
          setAlert(null)
        }, 3000)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={login}>
      <AlertMessage info={alert}/>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button className="mt-3" variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p className="mt-3">
        Dont have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
