import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productActions.js";
import { getAllOrders } from "../../actions/orderActions.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsState);
  const { orders } = useSelector((state) => state.allOrders);
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Earnings"],
    datasets: [
      {
        label: "total amount",
        backgoundColor: "teal",
        hoverBackgroundColor: ["teal"],
        data: [0, 4000],
        borderColor: "white",
      },
    ],
  };
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  const doughnutState = {
    labels: ["out of stock", "instock"],
    datasets: [
      {
        backgroundColor: ["white", "darkgrey"],
        data: [outOfStock, products.length - outOfStock],
        hoverBackgroundColor: "teal",
      },
    ],
  };

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummary">
            <div>
              <p>
                total ordered amount <br /> {totalAmount}
              </p>
            </div>

            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>product</p>
                <p>{products && products.length}</p>
              </Link>

              <Link to="/admin/orders">
                <p>orders</p>
                <p>{orders && orders.length}</p>
              </Link>
            </div>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
