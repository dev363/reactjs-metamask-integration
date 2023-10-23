import { useState } from "react";
import { Form, Row, Col, Button, Card, Spinner } from "react-bootstrap";

const TransferBalance = () => {
  const [loading, setLoading] = useState(false);
  const transferBalance = (e) => {
    console.log("IIIOOOO OOPPP PPPP", window.ethereum);
  };

  return (
    <Card bg="Light" text="dark">
      <Card.Header>Transfer Balance</Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md={9}>
              <Form.Label>Account</Form.Label>
              <Form.Control type="text" placeholder="xxx0000xxx000xxx" />
            </Col>
            <Col md={3}>
              <Form.Label>ETH</Form.Label>
              <Form.Control type="number" placeholder="0.0001" />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <center>
                <Button variant="primary" onClick={(e) => transferBalance(e)}>
                  Transfer {loading && <Spinner size="sm" />}
                </Button>
              </center>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default TransferBalance;
