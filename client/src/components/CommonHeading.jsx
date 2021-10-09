import React from "react";
import { Container, Row } from "react-bootstrap";
import "./CommonHeading.css";
function CommonHeading({ title, children }) {
  return (
    <div className="cmn-heading">
      <Container>
        <Row>
          <div className="ctxt-cmn-heading">
            {title && (
              <>
                <h1 className="hdng">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default CommonHeading;
