import React, { useContext, useState } from "react";
import "./Order.css";
import { Context } from "../../context/Context";
import axios from "axios";

const Order = () => {
  const { getTotalCartAmount, shoes_list, cartItems, url, token } = useContext(Context);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    shoes_list.forEach((shoe) => {
      if (cartItems[shoe._id] > 0) {
        let itemInfo = shoe;
        itemInfo['quantity'] = cartItems[shoe._id];
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 3,
    };
  
    console.log("Order Data:", orderData); // Log order data for debugging
  
    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response:", response); // Log response for debugging
  
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error: Order placement failed");
      }
    } catch (error) {
      console.error("Error placing order:", error); // Log error for debugging
      alert("Error: Order placement failed");
    }
  };
  

  return (
    <form className="Order" onSubmit={placeOrder}>
      <div className="orderLeft">
        <p className="title">Delivery Information</p>
        <div className="fields">
          <input type="text" name="firstName" onChange={onChange} value={data.firstName} placeholder="First Name" required />
          <input type="text" name="lastName" onChange={onChange} value={data.lastName} placeholder="Last Name" required />
        </div>
        <input type="email" name="email" onChange={onChange} value={data.email} placeholder="Email address" required />
        <input type="text" name="street" onChange={onChange} value={data.street} placeholder="Street" required />
        <div className="fields">
          <input type="text" name="city" onChange={onChange} value={data.city} placeholder="City" required />
          <input type="text" name="state" onChange={onChange} value={data.state} placeholder="State" />
        </div>

        <div className="fields">
          <input type="text" name="zipcode" onChange={onChange} value={data.zipcode} placeholder="Zip code" required />
          <input type="text" name="country" onChange={onChange} value={data.country} placeholder="Country" required />
        </div>
        <input type="text" name="phone" onChange={onChange} value={data.phone} placeholder="Phone number" required />
      </div>

      <div className="orderRight">
        <div className="cartTotal">
          <h2>Cart Total</h2>
          <div>
            <div className="cartTotalDetails">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartTotalDetails">
              <p>Delivery Fee</p>
              <p>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 3}
              </p> 
            </div>
            <hr />
            <div className="cartTotalDetails">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 3}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Order;
