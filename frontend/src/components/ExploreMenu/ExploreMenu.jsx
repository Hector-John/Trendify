import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className="categories" id="categories">
      <h1>Explore our catalogue</h1>
      <p className="categoriesText">
        Discover a wide range of stylish and comfortable footwear options. From
        trendy sneakers to classic loafers, we have something for every
        occasion. Explore our catalogue and step into fashion-forward footwear
        today.
      </p>
      <div className="categoriesList">
        {menu_list.map( (item, index) => {
            return (
                <div onClick={() => setCategory(prev => prev === item.menu_name? 'All':item.menu_name)} className="categoriesListitems" key={index}>
                    <img className={category===item.menu_name?'active':""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div> 
            )
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
