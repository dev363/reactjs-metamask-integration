import { Fragment, useState } from "react";
import { ethers } from "ethers";
import {
  Form,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Badge,
  CardHeader,
  CardBody,
} from "react-bootstrap";
import { RCP_PROVIDER, SENDER_PRIVATE_KEY } from "./Constants";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TransactionDetails from "./TransactionDetails";

const TransferBalance = ({ useAccountAddress }) => {
  const [loading, setLoading] = useState(false);
  const [accountTo, setAccountTo] = useState(
    "0x637201757838059699Ed75E163c15D409da2b2f1"
  );
  const [amount, setAmount] = useState(0.05);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [error, setError] = useState(null);

  const transferBalance = async (e) => {
    if (accountTo && Number(amount) > 0) {
      try {
        console.log(RCP_PROVIDER, SENDER_PRIVATE_KEY, amount, 66);
        // Connect to the local Ethereum network provided by Ganache
        const provider = new ethers.JsonRpcProvider(RCP_PROVIDER);
        console.log(RCP_PROVIDER, SENDER_PRIVATE_KEY, amount, 77);
        // Create a wallet with the sender's private key (from Ganache)
        const senderWallet = new ethers.Wallet(SENDER_PRIVATE_KEY, provider);
        console.log(RCP_PROVIDER, SENDER_PRIVATE_KEY, amount, 88);
        // Specify the amount to transfer (in Wei)
        const amountInWei = ethers.parseEther(amount.toString()); // 0.01 ETH
        console.log(RCP_PROVIDER, SENDER_PRIVATE_KEY, amount, amountInWei, 66);
        // Create and send the transaction
        const tx = await senderWallet.sendTransaction({
          to: accountTo,
          value: amountInWei,
        });
        setTransactionDetails(tx);
        console.log("Transaction sent:", tx);
      } catch (error) {
        setError(error);
        console.error("Error sending transaction:", error);
      }
      //   const transaction = {
      //     to: accountTo, // Replace with the recipient's Ethereum address
      //     value: "0x" + Number(10000000000000000).toString(16),
      //   };
      //   // Send the transaction
      //   console.log("IIIOOOO OOPPP PPPP", window.ethereum, transaction);
      //   try {
      //     const result = await window.ethereum.request({
      //       method: "eth_sendTransaction",
      //       params: [transaction],
      //     });

      //     console.log(result, 9999);
      //   } catch (error) {
      //     console.log(error, 9999);
      //   }
    }
  };

  return (
    <Fragment>
      <Card bg="Light" text="dark">
        <Card.Header>Transfer Balance</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={9}>
                <Form.Label>Account</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="xxx0000xxx000xxx"
                  value={accountTo}
                  onChange={(e) => setAccountTo(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Label>ETH</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0.0001"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
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
      {transactionDetails && (
        <TransactionDetails transaction={transactionDetails} />
      )}
    </Fragment>
  );
};
export default TransferBalance;
