import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./confirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 499 ? 0 : 40;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}`;
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  };

  return (
    <>
      <MetaData title="confirm order" />
      <CheckoutSteps activeStep={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>name: </p>
                <span>{user.name}</span>
              </div>

              <div>
                <p>phone: </p>
                <span>{shippingInfo.phoneNo}</span>
              </div>

              <div>
                <p>address: </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>items in cart</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems.map((item) => {
                return (
                  <div key={item.product}>
                    <img src={item.image} alt="product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} x {item.price} ={" "}
                      <b>{item.price * item.quantity}</b>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* */}
        <div>
          <div className="orderSummary">
            <Typography>summary</Typography>
            <div>
              <div>
                <p>subtotal </p>
                <span>{subtotal}</span>
              </div>

              <div>
                <p>shipping fees </p>
                <span>{shippingCharges}</span>
              </div>

              <div>
                <p>gst </p>
                <span>{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>total: </b>
              </p>
              <span>{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>continue payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
