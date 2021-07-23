import React, { useEffect, useState } from "react";
import { Form, Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authAction";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const history = useHistory();

  const selectError = (state) => state.error;
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  //Save new user then go to home page
  const registerSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMsg("Passwords Do Not Match");
    } else {
      const user = {
        name: name,
        email: email,
        password: password,
      };
      dispatch(register(user));
    }
  };
  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
      setMsg(error.msg);
    } else {
      setMsg(null);
    }
  }, [error]);
  return (
    <Form id="registerForm" onSubmit={(event) => registerSubmit(event)}>
      <h1>Signup</h1>
      <Form.Group>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter full name"
          required
        />
      </Form.Group>
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
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm password"
          required
        ></Form.Control>
      </Form.Group>
      {/* Captcha */}
      <Button type="submit">Signup</Button>
      <Nav.Link id="account" onClick={() => history.push("/login")}>
        Already have an account?
      </Nav.Link>
        <div className="alert">{msg}</div>
    </Form>
  );
};

export default Signup;
