import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <footer>
        <Container>
          <Row>
            <Col className="text-center">
              <span>Coptright &copy; SRJ </span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
