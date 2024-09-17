import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const Context = createContext(null);

const ContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const [shoes_list, setShoesList] = useState([]);
  const url = "http://localhost:5000";

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) {
        return { ...prev, [itemId]: 1 };
      } else {
        return { ...prev, [itemId]: prev[itemId] + 1 };
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] === 1) {
        const updatedCart = { ...prev };
        delete updatedCart[itemId];
        return updatedCart;
      } else {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      }
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = shoes_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchShoes = async () => {
    const response = await axios.get(url + "/api/shoe/list");
    setShoesList(response.data.shoes);
  };

  useEffect(() => {
    async function loadData() {
      await fetchShoes();
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    shoes_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
