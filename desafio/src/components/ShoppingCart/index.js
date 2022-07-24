/**
 * @desc [Componente do Produto no carrinho]
 */
import React from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useProducts } from "../../contexts/ProductsContext/ProductsContext";
import {
  ShoppingCartBoxCard,
  Title,
  Price,
  Remover,
  Adicionar,
  ProductCountInputGroup,
  ShoppingCartFixedContainer,
  ShoppingCartHeader,
} from "./styles";

export default function ShoppingCart() {
  const [{ shoppingCart, isShoppingCartActive }, dispatch] = useProducts();
  const value = shoppingCart
    ? shoppingCart.reduce(
        (acc, product) => acc + parseFloat(product.price * product.count),
        0
      )
    : [];
  return (
    <>
      <ShoppingCartFixedContainer
        className="shadow p-3"
        active={isShoppingCartActive || undefined}
      >
        <Row className="align-items-center mb-3">
          <Col>
            <ShoppingCartHeader className="d-inline-flex text-start mr-auto">
              Carrinho
            </ShoppingCartHeader>
          </Col>
          <Col xs="auto">
            <Button
              variant="danger"
              className="btn-sm w-auto"
              onClick={() =>
                dispatch({ type: "TOGGLE_SHOPPING_CART", payload: false })
              }
            >
              X
            </Button>
          </Col>
        </Row>
        {shoppingCart.length === 0 ? (
          <Alert variant="warning">Sem itens cadastrados</Alert>
        ) : (
          shoppingCart.map((cartProduct) => {
            return (
              <ShoppingCartBoxCard className="row align-items-center p-2  my-2 justify-content-start gx-1">
                <img
                  className="rounded"
                  src={cartProduct.avatar}
                  alt={cartProduct.name}
                />
                <Col xs="auto" className="ms-2">
                  <Title>{cartProduct.name}</Title>
                  <Price>${cartProduct.price}</Price>
                </Col>
                <ProductCountInputGroup className="d-flex ms-auto w-auto align-items-center justify-content-end col-auto ">
                  <Remover
                    className="btn btn-outline-secondary col-auto"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_SHOPPING_CART",
                        payload: cartProduct.id,
                      })
                    }
                  >
                    -
                  </Remover>

                  <Form.Control
                    value={cartProduct.count}
                    aria-label={cartProduct.count}
                    aria-describedby="product-count"
                    readOnly
                  />
                  <Adicionar
                    className="btn btn-outline-secondary col-auto"
                    onClick={() =>
                      dispatch({
                        type: "ADD_TO_SHOPPING_CART",
                        payload: cartProduct,
                      })
                    }
                  >
                    +
                  </Adicionar>
                </ProductCountInputGroup>
              </ShoppingCartBoxCard>
            );
          })
        )}
        <p className="text-end">
          <b>Valor total: </b>R$ {value}
        </p>
      </ShoppingCartFixedContainer>
    </>
  );
}
