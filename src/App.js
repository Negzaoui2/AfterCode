import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import QRCodePage from './Components/QRCodePage';
import FormulaireClient from './Components/FormulaireClient';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodePage />} />
        <Route path="/form" element={<FormulaireClient />} />
      </Routes>
    </Router>
  );
};

export default App;
