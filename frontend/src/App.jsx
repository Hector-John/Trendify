import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";

const App = () => {

  const [login, setLogin] = useState(false)

  return (
    <>
    {login? <Login setLogin={setLogin}/>:<></>}
    <div className="app">
      <Navbar setLogin={setLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </div>
    <Footer/>
    </>
  );
};

export default App;
