import React from "react";
import "./ShoeDisplay.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { Shoes } from "../Shoes/Shoes";

export const ShoeDisplay = ({ category }) => {
  const { shoes_list, addToCart } = useContext(Context);

  return (
    <div className="ShoeDisplay" id="ShoeDisplay">
      <h2>Best Sellers</h2>
      <div className="ShoeList">
        {shoes_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <Shoes
                key={item._id} 
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                addToCart={() => addToCart(item._id)} 
              />
            );
          }
          return null; 
        })}
      </div>
    </div>
  );
};
