import React from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productActions";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loading from "../../component/layout/loader/loading";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("added to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);
    console.log(myForm);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("reviewed");
      dispatch({ type: "newReviewReset" });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product.name}`} />
          <div className="wrapper">
            <div className="ProductDetails">
              <div className="left">
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => {
                      return (
                        <img
                          className="CarouselImage"
                          key={i}
                          src={item.url}
                          alt={`${i}slide`}
                        />
                      );
                    })}
                </Carousel>
              </div>

              <div className="right">
                <p className="productDetailsName">{product.name}</p>
                <ReactStars
                  {...{
                    edit: false,
                    color: "grey",
                    activeColor: "white",
                    size: window.innerWidth < 600 ? 20 : 25,
                    value: product.avgRating,
                    isHalf: true,
                    border: "black",
                  }}
                />
                <span className="reviews">{product.numOfReviews} reviews</span>
                <h2 className="productDetailsPrice">{product.price}</h2>
                <div className="addToCart">
                  <button className="plusminus" onClick={decreaseQuantity}>
                    -
                  </button>
                  <input readOnly type="number" value={quantity} />
                  <button className="plusminus" onClick={increaseQuantity}>
                    +
                  </button>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    className="addToCartButton"
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </button>
                </div>
                <p className="stock">
                  {product.stock > 1 ? "In Stock" : "Sold out"}
                </p>
              </div>
            </div>
            <div className="productDescription">
              <h3>about product</h3>
              <p>{product.description}</p>
            </div>

            <div className="reviewsSection">
              <h3>Reviews</h3>
              <button
                onClick={submitReviewToggle}
                className="reviewSubmitButton"
              >
                write a review
              </button>

              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle color="primary">submit review</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />

                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle}>Cancel</Button>
                  <Button onClick={reviewSubmitHandler}>Submit</Button>
                </DialogActions>
              </Dialog>

              {product.reviews && product.reviews[0] ? (
                <div className="review">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
              ) : (
                <p className="noReviewsYes">no reviews yet</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
