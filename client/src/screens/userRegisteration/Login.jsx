import React, { useEffect, useState } from "react";
import CommonHeading from "../../components/CommonHeading";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import Loading from "../../components/Loading";
import ToastMgs from "../../components/ToastMgs";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions/userActions";

//Login page main component
function Login() {
  // use state hooks to set variables and render states of of users
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  //use history hook to push to other page
  const history = useHistory();
  //useDispatch from react-redux
  const dispatch = useDispatch();
  //useSelector from react-redux
  const userLogin = useSelector((state) => state.userLogin);
  console.log(" From redux store", userLogin);
  const { userInfo } = userLogin;
  //useEffect to be called once userInfo in redux store is changed from intial value
  useEffect(() => {
    if (userInfo) {
      history.push("/myNotes");
    }
  }, [history, userInfo]);

  // submitting users credentials to backend and receiving response from backend
  const submitDetails = async (e) => {
    //to prevent page reloading upon submission
    e.preventDefault();
    console.log(email, password);
    //using loading component for rotating slider
    setLoading(true);
    //making request to backend end point through axios
    try {
      const { data } = await axios.post(
        "/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      // calling actions to send user information to redux store
      dispatch(loginAction(data));
      //    setError(false);
      // console.log(data);
      //storing into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      //showing error messages if any
    } catch (error) {
      setError(error.response.data.msg);
      setLoading(false);
    }
  };
  return (
    <div className="wrapup">
      <CommonHeading title="LOGIN">
        <div className="loginDiv">
          {/* Loading Component And ToastMsgs component rendering based on conditions */}
          {loading && <Loading />}
          {error && <ToastMgs variant="danger">{error}</ToastMgs>}
          <Form onSubmit={submitDetails}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <Row>
            <Col
              style={{
                marginTop: "9px",
                fontSize: "16px",
              }}
            >
              New to Note Rite ?{" "}
              <Link
                to="/signup"
                style={{
                  textDecoration: "underline",
                  color: "#0c2d48",
                }}
              >
                Signup Now
              </Link>
            </Col>
          </Row>
        </div>
      </CommonHeading>
    </div>
  );
}

export default Login;
