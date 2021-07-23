import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../redux/actions/authAction";

const Logout = () => {
  console.log("hi")
  const dispatch = useDispatch();
  dispatch(logout());
  //Go to landing page
  return <Redirect to="/" />;
};

export default Logout;
