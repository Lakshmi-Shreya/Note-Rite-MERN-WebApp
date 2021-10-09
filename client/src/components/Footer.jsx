import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        backgroundColor: "#2E8BC0",
        color: "white",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Notes Rite . All Rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
