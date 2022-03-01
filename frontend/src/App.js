import "./App.css";
import Header from "./component/layout/header/Header.js";
import Footer from "./component/layout/footer/Footer.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignup from "./component/user/LoginSignup";
import store from "./store";
import React, { useEffect, useState } from "react";
import { loadUser } from "./actions/userActions";
import Profile from "./component/user/Profile.js";
import ProtectedRoute from "./component/routes/ProtectedRoute";
import UpdateProfile from "./component/user/UpdateProfile.js";
import UpdatePassword from "./component/user/UpdatePassword.js";
import ForgotPassword from "./component/user/ForgotPassword.js";
import ResetPassword from "./component/user/ResetPassword.js";
import Cart from "./component/cart/Cart.js";
import Shipping from "./component/cart/Shipping.js";
import ConfirmOrder from "./component/cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/cart/OrderSuccess.js";
import MyOrders from "./component/order/MyOrders.js";
import WebFont from "webfontloader";
import OrderDetails from "./component/order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";

function App() {
  // const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  return (
    <>
      <Router>
        <Header />

        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/login" component={LoginSignup} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute
          exact
          path="/profile/update"
          component={UpdateProfile}
        />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}
        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <Switch>
          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrder}
          />

          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/products"
            component={ProductList}
          />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/product"
            component={NewProduct}
          />
        </Switch>
        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />
        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <Footer />
      </Router>
    </>
  );
}

export default App;
