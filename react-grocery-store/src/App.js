import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingList from './components/shoppingList';
import OrderSummary from './components/orderSummary';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/order-summary" element={<OrderSummary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;