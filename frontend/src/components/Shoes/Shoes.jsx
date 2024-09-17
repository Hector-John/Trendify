import React, { useContext } from 'react'
import './Shoes.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

export const Shoes = ({id, name, price, description, image}) => {

const {addToCart, removeFromCart, cartItems, url} = useContext(Context);

  return (
    <div className='Shoes'>
<div className="shoesImageCont">
    <img className='shoesImg' src={url+"/images/"+image} alt="" />
    {!cartItems[id]
        ?<img className='add' onClick={() =>{
            addToCart(id)
        }} src={assets.add_icon_white}/> : <div className="shoeCount">
            <img onClick={()=> removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
        </div> 
    }
</div>
<div className="shoesInfo">
    <div className="shoesRating">
        <p>{name}</p>
        <img src={assets.rating_starts} alt="" />
    </div>
    <p className="shoesDescription">
        {description}
    </p>
    <p className="shoesPrice">${price}</p>
</div>
    </div>
  )
}
