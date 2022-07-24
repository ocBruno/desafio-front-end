import React from "react";
import { Form } from "react-bootstrap";

export default function Search(props) {
  return (
    <>
      <Form>
        <Form.Group controlId="search">
          {props.title && <Form.Label>{props.title}</Form.Label>}
          <Form.Control
            type="text"
            onChange={props.handleChange}
            placeholder="Buscar produto"
          />
        </Form.Group>
      </Form>
    </>
  );
}
