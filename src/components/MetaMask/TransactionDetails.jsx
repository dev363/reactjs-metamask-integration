import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

const TransactionDetails = ({ transaction }) => {
  const [show, setShow] = useState(false);
  const [isCopy, setCopy] = useState(null);
  return (
    <Card className="mt-3">
      <CardHeader>Transaction Details</CardHeader>
      <CardBody>
        <Row>
          <Col md={8}>
            <small style={{ fontSize: 10 }}>{transaction.hash}</small>{" "}
          </Col>
          <Col md={2}>
            <CopyToClipboard
              text={transaction.hash}
              onCopy={() => setCopy(true)}
            >
              <Badge bg="warning" text="dark" className="cursor-pointer">
                {isCopy ? "Copied!" : "Copy"}
              </Badge>
            </CopyToClipboard>{" "}
          </Col>
          <Col md={2}>
            <Button onClick={(e) => setShow((s) => !s)} size="sm">
              {show ? "Hide" : "Show"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {show && <pre>{JSON.stringify(transaction, null, 2)}</pre>}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default TransactionDetails;
