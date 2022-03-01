import React, { useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import Loader from "../layout/loader/loading";
import { useAlert } from "react-alert";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="order details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                order #{order && order._id}
              </Typography>
              <Typography>shipping info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name</p>
                  <span>{order.user && order.user.name}</span>
                </div>

                <div>
                  <p>phone</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>

                <div>
                  <p>address</p>
                  <span>
                    {order.shippingInfo &&
                      `
                        ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state},
                        ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}
                        `}
                  </span>
                </div>
              </div>

              <Typography>payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeded"
                      ? "paid"
                      : "not paid"}
                  </p>
                </div>

                <div>
                  <p>amount</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>

                <Typography>order status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>{order.orderStatus && order.orderStatus}</p>
                  </div>
                </div>
              </div>

              <div className="orderDetailsCartItems">
                <Typography>order items</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => {
                      return (
                        <div key={item.product}>
                          <img src={item.image} alt="product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
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
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
