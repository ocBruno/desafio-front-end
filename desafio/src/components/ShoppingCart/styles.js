import { Container, InputGroup } from "react-bootstrap";
import styled from "styled-components";
export const ShoppingCartHeader = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`;
export const ShoppingCartFixedContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  position: fixed;
  background: white;
  height: 100%;
  width: 25rem;
  max-width: 80vw;
  top: 0;
  right: ${(props) => (props.active ? 0 : "-400px")};

  transition: 0.7s;
  z-index: 1;
`;

export const ShoppingCartBoxCard = styled.section`
  display: flex;
  flex-direction: row;
  box-shadow: 1px 1px 11px #e2f1ff;
  img {
    height: 50px;
    width: auto;
  }
`;
export const ProductCountInputGroup = styled(InputGroup)`
  > input {
    text-align: center;
    pointer-events: none;
    max-width: 3rem;
  }
`;
export const Title = styled.div`
  color: black;
  font-weight: bold;
`;

export const Price = styled.span`
  color: green;
`;
export const Remover = styled.button`
  font-weight: bold;
`;
export const Adicionar = styled.button`
  font-weight: bold;
`;
