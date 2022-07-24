import React, { useState } from "react";
import { Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import { useProducts } from "../../contexts/ProductsContext/ProductsContext";
//components
import Nav from "../../components/Nav";
import Search from "../../components/Search";
import ShoppingCart from "../../components/ShoppingCart";
import ProductCard from "../../components/ProductCard";
import { HomeContainer, ProductsHeader } from "./styles";

export default function Home() {
  const [{ filteredProducts, shoppingCart, products, status }, dispatch] =
    useProducts();
  const [debounceId, setDebounceId] = useState();

  const handleSearchProductsInputChange = (e) => {
    debounceId && clearTimeout(debounceId);
    setDebounceId(
      setTimeout(() => {
        dispatch({ type: "SEARCH_PRODUCTS", payload: e.target.value });
      }, 1000)
    );
  };

  const BoxProductsContent = () => {
    const activeProducts = filteredProducts || products;
    if (status === "loading") {
      return (
        <Row className="flex-grow-1">
          <Spinner
            className="m-auto"
            animation="border"
            role="products-status"
          />
        </Row>
      );
    } else if (status === "error") {
      return <Alert variant="danger">Oops algo deu errado</Alert>;
    } else if (status === "success") {
      return (
        <Row>
          {activeProducts.map((product) => (
            <ProductCard props={product} key={product.id} />
          ))}
        </Row>
      );
    }
  };

  return (
    <React.Fragment>
      <HomeContainer className="d-flex flex-column h-100 overflow-auto ">
        <Nav />
        <ShoppingCart />
        <ProductsHeader className="d-flex flex-column py-4">
          <Col xs={12} className="d-flex align-items-center flex-wrap">
            <h2 className="col-12 col-md-6 me-auto">Produtos</h2>
            <Col xs={12} md={3} className="d-flex ms-auto justify-content-end">
              <Col xs={6} md={8} className="me-auto">
                <Search handleChange={handleSearchProductsInputChange} />
              </Col>

              <Button
                className="col-auto"
                variant="primary"
                onClick={() =>
                  dispatch({ type: "TOGGLE_SHOPPING_CART", payload: true })
                }
              >
                Carrinho ({shoppingCart.length})
              </Button>
            </Col>
          </Col>
        </ProductsHeader>
        <BoxProductsContent />
      </HomeContainer>
    </React.Fragment>
  );
}
