import React from "react";
import { Link } from "react-router-dom";
import ReactStarts from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="productCardContainer">
        <div className="top">
          <img
            src={product.images[0].url && product.images[0].url}
            alt="productImage"
          />
        </div>

        <div className="bottom">
          <p className="name">{product.name}</p>
          <div className="reviews">
            <ReactStarts
              {...{
                edit: false,
                color: "grey",
                activeColor: "black",
                size: window.innerWidth < 600 ? 20 : 25,
                value: product.avgRating,
                isHalf: true,
                border: "black",
              }}
            />
            <span className="noReviews">{product.numOfReviews} reviews</span>
          </div>
          <p className="price">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
