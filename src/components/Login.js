import React, { useEffect, useState } from "react";
import { Form, Button, Nav } from "react-bootstrap";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  
  const selectError = (state) => state.error;
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const loginSubmit = (event) => {
    event.preventDefault();
    if (email === "") {
      setMsg("Please enter an email");
    } else if (password === "") {
      setMsg("Please enter password");
    } else {
      const user = { email, password };
      dispatch(login(user));
    }
  };
  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setMsg(error.msg);
    } else {
      setMsg(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Form id="loginForm" onSubmit={(event) => loginSubmit(event)}>
      <h1>Login</h1>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter email"
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
          required
        ></Form.Control>
      </Form.Group>
      <Button type="submit">Login</Button>
      <Nav.Link id="account" onClick={() => history.push("/signup")}>
        Don't have an account?
      </Nav.Link>
      <Form.Group>
        <div className="alert">{msg}</div>
      </Form.Group>
    </Form>
  );
};

export default Login;
