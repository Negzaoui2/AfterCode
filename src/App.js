import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QRCodePage from "./Components/QRCodePage";
import FormulaireClient from "./Components/FormulaireClient";
import CustomersList from "./Components/customersList.js";
import UpdateCustomer from "./Components/updateClient.js";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodePage />} />
        <Route path="/form" element={<FormulaireClient />} />
        <Route path="/customers" element={<CustomersList />} />
        <Route path="/update-customer/:id" element={<UpdateCustomer />} />
      </Routes>
    </Router>
  );
};

export default App;
