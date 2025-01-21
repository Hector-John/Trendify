import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import Login from "./components/Login/Login";
import FailPage from "./pages/Order/PaymentFail";
import SuccessPage from "./pages/Order/PaymentSuccess";

const App = () => {
  const [login, setLogin] = useState(false);

  return (
    <>
      {login ? <Login setLogin={setLogin} /> : null}
      <div className="app">
        <Navbar setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/fail" element={<FailPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
