import React, { Fragment, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { ethers } from "ethers";
import CopyToClipboard from "react-copy-to-clipboard";
const MetaMask = () => {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [isCopy, setCopy] = useState(false);
  const [loading, setLoading] = useState(false);

  const connectMetamask = () => {
    setLoading(true);
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          console.log(res, 8889);
          changeAccount(res[0]);
        })
        .catch((err) => {
          setError("Unable to get Account");
          setLoading(false);
        });
    } else {
      setError("Please Install Metamask");
      setLoading(false);
    }
  };

  const changeAccount = (account) => {
    setDefaultAccount(account);
    getUserBalance(account);
  };

  const getUserBalance = (account) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(account), "latest"],
      })
      .then((res) => {
        let balance = ethers.formatEther(res);
        setBalance(balance);
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to get Balance");
        setLoading(false);
      });
  };
  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
        <Card bg="dark" text="white">
          <Card.Header>
            <center>
              <Card.Title>Connection Status</Card.Title>
            </center>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Address</th>
                  <td>
                    {loading ? (
                      <Spinner size="sm" />
                    ) : (
                      <Fragment>
                        {defaultAccount}
                        &nbsp;
                        {defaultAccount && (
                          <CopyToClipboard
                            text={defaultAccount}
                            onCopy={() => setCopy(true)}
                          >
                            <Badge
                              bg="warning"
                              text="dark"
                              className="cursor-pointer"
                            >
                              {isCopy ? "Copied!" : "Copy"}
                            </Badge>
                          </CopyToClipboard>
                        )}
                      </Fragment>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Balance</th>
                  <td>{loading ? <Spinner size="sm" /> : balance}</td>
                </tr>
                {error && (
                  <tr>
                    <td colSpan={2}>
                      <Alert variant="danger">{error}</Alert>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <center>
              <Button variant="primary" onClick={(e) => connectMetamask(e)}>
                Connect Metamask
              </Button>
            </center>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
export default MetaMask;
