import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  // Button,
  FormControl,
  Container,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions/userActions";
function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  // Taking user data from local storage
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/"> Note Rite</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Nav>

          <Nav
            className=" my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/myNotes">My Notes</Link>
            </Nav.Link>
            <NavDropdown
              title={userData ? userData.name : "User"}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item>
                <Link
                  to="/"
                  onClick={() => {
                    dispatch(logoutAction());
                    localStorage.removeItem("userInfo");
                    history.push("/");
                  }}
                >
                  Log Out
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
