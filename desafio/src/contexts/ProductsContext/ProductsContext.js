import axios from "axios";
import * as React from "react";
import { ECOMMERCE_PRODUCTS_API_URL } from "../../constants";
import useLocalStorage from "../../hooks/useLocalStorage";

const getInitialState = (shoppingCartStorage = []) => ({
  status: null,
  products: undefined,
  filteredProducts: undefined,
  shoppingCart: shoppingCartStorage,
  isShoppingCartActive: false,
  error: null,
});

const ProductsContext = React.createContext([getInitialState(), () => {}]);
ProductsContext.displayName = "ProductsContext";

function productsReducer(state, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        status: "loading",
      };

    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        status: "success",
        products: action.payload,
      };

    case "GET_PRODUCTS_FAIL":
      return {
        ...state,
        status: "error",
        resizeTo: undefined,
      };

    case "RESET_GET_PRODUCTS":
      return {
        ...state,
        status: null,
        products: undefined,
        error: null,
      };
    case "SEARCH_PRODUCTS":
      return {
        ...state,
        filteredProducts: filterProductsByTerm(state.products, action.payload),
      };
    case "TOGGLE_SHOPPING_CART":
      return {
        ...state,
        isShoppingCartActive: action.payload,
      };
    case "ADD_TO_SHOPPING_CART":
      return {
        ...state,
        shoppingCart: addToShoppingCart(state.shoppingCart, action.payload),
      };
    case "REMOVE_FROM_SHOPPING_CART":
      return {
        ...state,
        shoppingCart: removeFromShoppingCart(
          state.shoppingCart,
          action.payload
        ),
      };

    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
}

const addToShoppingCart = (shoppingCart, product) => {
  if (shoppingCart.some((cartProduct) => cartProduct.id === product.id)) {
    return shoppingCart.map((cartProduct) =>
      cartProduct.id === product.id
        ? { ...product, count: cartProduct.count + 1 }
        : cartProduct
    );
  } else {
    return [...shoppingCart, { ...product, count: 1 }];
  }
};

const removeFromShoppingCart = (shoppingCart, productId) => {
  const updatedProducts = shoppingCart
    .map((cartProduct) => {
      if (cartProduct.id === productId) {
        if (cartProduct.count === 1) {
          return false;
        } else {
          return { ...cartProduct, count: cartProduct.count - 1 };
        }
      } else {
        return cartProduct;
      }
    })
    .filter((product) => product);
  return updatedProducts;
};

const filterProductsByTerm = (products, term) => {
  if (!term) {
    return undefined;
  } else {
    return products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
  }
};

function useProducts() {
  const context = React.useContext(ProductsContext);
  if (context === undefined) {
    throw new Error(`useProducts must be used within a ProductsProvider`);
  }
  return context;
}

function ProductsProvider({ children }) {
  const [shoppingCartStorage, setShoppingCartStorage] = useLocalStorage(
    "react-e-commerce-shopping-cart",
    undefined
  );

  const [state, dispatch] = React.useReducer(
    productsReducer,
    getInitialState(shoppingCartStorage)
  );

  // Initialize products
  React.useEffect(() => {
    if (state.products === getInitialState().products) {
      dispatch({ type: "GET_PRODUCTS" });
      const controller = new AbortController();

      axios
        .get(ECOMMERCE_PRODUCTS_API_URL)
        .then((res) =>
          dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data })
        )
        .catch((err) => {
          if (err.name !== "AbortError") {
            dispatch({ type: "GET_PRODUCTS_FAIL", error: err });
          }
        });
      // cancel axios calls when provider unmounts
      return () => controller.abort();
    }
  }, [state.products]);

  // Update storage
  React.useEffect(() => {
    setShoppingCartStorage(state.shoppingCart);
  }, [setShoppingCartStorage, state.shoppingCart]);

  return (
    <ProductsContext.Provider value={[state, dispatch]}>
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsProvider, useProducts };
