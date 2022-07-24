import { Button, Card, Col } from "react-bootstrap";
import styled from "styled-components";

export const ProductCardContainer = styled(Col)``;
export const AddToCartButton = styled(Button)`
  white-space: nowrap;
`;
export const CardTitle = styled(Card.Title)`
  font-weight: 400;
  font-size: 1.5rem;
`;
export const CardImg = styled(Card.Img)``;
export const CardText = styled(Card.Text)`
  height: 5rem;
`;
export const Price = styled.span`
  color: green;
  display: block;
  font-weight: bold;
`;
