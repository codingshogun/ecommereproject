import React from "react";
import "./cartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <>
      <div className="CartItemCard">
        <img src={item.image} alt={`${item.name} `} />
        <div>
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          <span>{`amount: ${item.price}`}</span>
          <p onClick={() => deleteCartItems(item.product)}>remove</p>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
