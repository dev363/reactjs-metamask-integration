import { Fragment } from "react";
import NavBarHeader from "./NavBar";
import { Container } from "react-bootstrap";
import "./styles.css";

const HomeLayout = ({ children }) => {
  return (
    <Fragment>
      <NavBarHeader />
      <Container className="space-container">{children}</Container>
    </Fragment>
  );
};
export default HomeLayout;
