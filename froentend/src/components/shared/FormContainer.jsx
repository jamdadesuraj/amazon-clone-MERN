import React from "react";
import { Row, Col, Container } from "react-bootstrap";
const FormContainer = ({ children }) => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={6} className="justify-content-center">
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormContainer;
