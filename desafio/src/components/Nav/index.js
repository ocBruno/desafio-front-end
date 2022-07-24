/**
 * @desc [Componente do Nav]
 */
import React from "react";
import { AppLogoImg } from "./styles";

//components
import { Col } from "react-bootstrap";

export default function Nav() {
  return (
    <nav className="d-flex flex-wrap w-100 align-items-center pt-3">
      <Col xs={2}>
        <AppLogoImg src="/logo512.png" alt="React Ecommerce Logo" />
      </Col>
    </nav>
  );
}
