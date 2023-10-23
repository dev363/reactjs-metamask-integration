import React, { Fragment, useState, useEffect } from "react";
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
import { CHAIN_IDS } from "./Constants";
import TransferBalance from "./TransferBalance";

const MetaMask = () => {
  const [chainID, setChainId] = useState(null);
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

  const isConnectedAccount = async () => {
    setLoading(true);
    const account =
      (await window.ethereum.request({ method: "eth_accounts" })) || false;
    if (account) {
      setDefaultAccount(account[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", ({ chainId }) => {
        // console.log("On chainChanged", chainId, 888);
        if (chainId) {
          setChainId(CHAIN_IDS[chainId]);
        }
      });
      window.ethereum.on("accountsChanged", (e) => {
        // console.log("On accountChanged",e, 999);
        setDefaultAccount(e[0]);
      });
      window.ethereum.on("connect", ({ chainId }) => {
        // console.log("on Connect",chainId, 888);
        if (chainId) {
          setChainId(CHAIN_IDS[chainId]);
        }
      });
      window.ethereum.on("disconnect", (e) => {
        // console.log("on disconnect",e, 666);
        setDefaultAccount(e[0]);
        setBalance(null);
      });
    }
    isConnectedAccount();
  }, []);

  useEffect(() => {
    getUserBalance(defaultAccount);
  }, [defaultAccount]);

  const changeAccount = (account) => {
    setDefaultAccount(account);
  };

  const getUserBalance = (account) => {
    if (account) {
      try {
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
      } catch (error) {
        setBalance(null);
      }
    } else {
      setBalance(null);
    }
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
            <Row>
              <Col>
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
                    <tr>
                      <th>Netword</th>
                      <td>{loading ? <Spinner size="sm" /> : chainID}</td>
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
              </Col>
            </Row>
            <Row>
              <Col>
                <TransferBalance />
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <center>
              {!defaultAccount && (
                <Button variant="primary" onClick={(e) => connectMetamask(e)}>
                  Connect Metamask
                </Button>
              )}
            </center>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
export default MetaMask;
