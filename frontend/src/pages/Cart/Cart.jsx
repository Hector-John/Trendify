import React, { useContext } from "react";
import "./Cart.css";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, shoes_list, removeFromCart, getTotalCartAmount, url } = useContext(Context);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cartItems">
        <div className="cartItemsTitle">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.keys(cartItems).map((itemId) => {
          const item = shoes_list.find((shoe) => shoe._id === itemId);
          if (item) {
            return (
              <div key={itemId}> 
                <div className="cartItemsitem cartItemsTitle">
                  <img src={url +"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className="remove">X</p>
                </div>
                <hr />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="cartBottom">
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
              <p>${getTotalCartAmount()===0?0:3}</p>
            </div>
            <hr />
            <div className="cartTotalDetails">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount() + 3}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="promocode">
          <div>
            <b>Have a PROMO CODE, enter it here</b>
            <div className="promocodeInput">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
