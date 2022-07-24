import React from "react";

import GlobalStyle from "./styles/global";
import Home from "./pages/Home/index";
import { ProductsProvider } from "./contexts/ProductsContext/ProductsContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProductsProvider>
                <Home />
              </ProductsProvider>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
