import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import CommonHeading from "../../components/CommonHeading";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";

import ToastMgs from "../../components/ToastMgs";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../redux/actions/userActions";
//signp page main component
function Signup() {
  // use state hooks to set variables and render states of of users
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfmPassword, setCnfmPassword] = useState("");
  const [pic, setPic] = useState("");

  const [WarningMsg, setWarningMsg] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  //use history hook to push to other page
  const history = useHistory();
  //useDispatch from react-redux
  const dispatch = useDispatch();
  //useSelector from react-redux
  const userSignup = useSelector((state) => state.userSignup);
  console.log("from redux sup.", userSignup);
  const { userInfo } = userSignup;
  //useEffect to be called once userInfo in redux store is changed from intial value
  useEffect(() => {
    if (userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  // submitting users credentials to backend and receiving response from backend
  const submitDetails = async (e) => {
    //to prevent page reloading upon submission
    e.preventDefault();
    //checking if password and confirm password are same or not
    if (password !== cnfmPassword) {
      return setWarningMsg(true);
    }
    //using loading component for rotating slider
    setLoading(true);
    //making request to backend end point through axios
    try {
      const { data } = await axios.post(
        "/signup",
        {
          name,
          email,
          password,
          pic,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      // calling actions to send information to redux store
      dispatch(signupAction(data));
      //redirecting to login screen once registeration is done
      // const redirecting = async () => {
      //   history.push("/login");
      // };
      // await redirecting();
      console.log(data);
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      //showing error messages if any
    } catch (error) {
      setLoading(false);
      setError(error.response.data.msg);
    }
  };
  //uploading users image to cloudinary and then fetching url from it
  const uploadPic = (img) => {
    //for getting users data through form data then appending it withs some clodinary data
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "note-rite");
    data.append("cloud_name", "slybls");
    //making request to cloudinary to upload the pic and send its url
    fetch("https://api.cloudinary.com/v1_1/slybls/image/upload", {
      method: "post",
      body: data,
    })
      //converting data that is being recieved sent by clodinary into json
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        //setting pic state with the url got from clodinary
        setPic(result.url.toString());
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <CommonHeading title="SIGN UP">
        <div className="signupDiv">
          {/* Loading Component And ToastMsgs component rendering based on conditions */}
          {loading && <Loading />}
          {WarningMsg && (
            <ToastMgs variant={"warning"}>Passwords Do Not Match</ToastMgs>
          )}
          {error && <ToastMgs variant={"danger"}>{error}</ToastMgs>}
          <Form onSubmit={submitDetails}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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
              <Form.Label> Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=" Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPasswordCnfm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=" Re-enter Password"
                value={cnfmPassword}
                onChange={(e) => setCnfmPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Profile Pic</Form.Label>
              <Form.File
                type="file"
                // setPic(e.target.files[0])
                onChange={(e) => uploadPic(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </Form>
          <Row>
            <Col
              style={{
                marginTop: "9px",
                fontSize: "16px",
              }}
            >
              Already signedup ?
              <Link
                to="/login"
                style={{
                  textDecoration: "underline",
                  color: "#0c2d48",
                }}
              >
                Login Now
              </Link>
            </Col>
          </Row>
        </div>
      </CommonHeading>
    </div>
  );
}

export default Signup;
