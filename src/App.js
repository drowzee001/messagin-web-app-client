import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from "./components/NavBar";
import Messages from "./components/Messages";
import NewMessage from "./components/NewMessage";
import Home from "./components/Home";
import Logout from "./components/Logout";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const selectAuth = (state) => state.auth;
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };
  if (auth.isLoading === false) {
    return (
      <Router>
        {/* Load NavBar and redirect to home if user is authenticated */}
        {auth.isAuthenticated ? <NavBar /> : null}
        <Route exact path="/">
          {auth.isAuthenticated ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/login">
          {auth.isAuthenticated ? <Redirect to="/home" /> : <Login />}
        </Route>

        <Route path="/signup">
          {auth.isAuthenticated ? <Redirect to="/home" /> : <Signup />}
        </Route>

        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute path={"/newMessage"}>
          <NewMessage />
        </PrivateRoute>
        <PrivateRoute path={"/messages/:conversation_id/:receiver_id"}>
          <Messages />
        </PrivateRoute>
        <PrivateRoute path="/logout" component={Logout} />
      </Router>
    );
  } else {
    return null;
  }
}

export default App;
