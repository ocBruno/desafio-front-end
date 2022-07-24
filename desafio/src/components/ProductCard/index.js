/**
 * @desc [Componente do Produto em lista]
 */
import React from "react";
import {
  ProductCardContainer,
  Price,
  CardTitle,
  CardText,
  CardImg,
  AddToCartButton,
} from "./styles";

import Card from "react-bootstrap/Card";
import { useProducts } from "../../contexts/ProductsContext/ProductsContext";
import { Col, Row } from "react-bootstrap";
// typo in api below desciption -> description
export default function ProductCard({
  props: { id, name, avatar, desciption, price },
}) {
  const dispatch = useProducts()[1];
  const handleAddProductToCart = (product) => {
    dispatch({ type: "ADD_TO_SHOPPING_CART", payload: product });
  };
  return (
    <ProductCardContainer xs={12} md={3} className="mb-4" id={id}>
      <Card>
        <CardImg variant="top" src={avatar} alt={name} />
        <Card.Body>
          <CardTitle>{name}</CardTitle>
          <CardText className="overflow-auto pe-2">{desciption}</CardText>
          <Row className="align-items-center justify-content-between">
            <Col xs="auto">
              <Price>${price}</Price>
            </Col>
            <Col xs="auto">
              <AddToCartButton
                variant="primary"
                onClick={(e) =>
                  handleAddProductToCart({
                    id,
                    name,
                    avatar,
                    desciption,
                    price,
                  })
                }
              >
                Adicionar ao carrinho
              </AddToCartButton>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </ProductCardContainer>
  );
}
