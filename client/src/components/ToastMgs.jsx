import React from "react";
import { Alert } from "react-bootstrap";
function ToastMgs({ variant = "info", children }) {
  return (
    <Alert variant={variant}>
      <strong>{children}</strong>
    </Alert>
  );
}

export default ToastMgs;
