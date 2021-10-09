import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.css";
function LandingPage() {
  return (
    <div className="main">
      <Container>
        <Row>
          <Col className="txtLp">
            <h1 className="Main-txtLp">
              Hey Note Riter 👋 Lets get Started..!
            </h1>
            <h4 className="Sub-txtLp">
              ✔ Note Rite Is An Personalized Online Descriptive Markdown
              Language Notes keeper
            </h4>
            <h4 className="Sub-txtLp">
              ✔ Signup or Login Now To Get Started...
            </h4>
            <div className="btnDiv">
              <Link to="/login">
                <Button size="lg" className="btnLp">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="outline-primary" className="btnLp">
                  Sign Up
                </Button>
              </Link>
            </div>
          </Col>

          <Col className="imgLp"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
