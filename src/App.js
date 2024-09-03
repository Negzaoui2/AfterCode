import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QRCodePage from "./Components/QRCodePage";
import FormulaireClient from "./Components/FormulaireClient";
import CustomersList from "./Components/customersList.js";
import UpdateCustomer from "./Components/updateClient.js";
import ProductsList from "./Components/Products/ProductsList .js";
import AddProduct from "./Components/Products/AddProduct.js";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodePage />} />
        <Route path="/form" element={<FormulaireClient />} />
        <Route path="/customers" element={<CustomersList />} />
        <Route path="/update-customer/:id" element={<UpdateCustomer />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/add-product" element={<AddProduct />} />

      </Routes>
    </Router>
  );
};

export default App;
