import React from "react";
import "./home.css";
import cover from "../../images/cover.jfif";
import Product from "./ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "../layout/loader/loading";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productsState
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={"home"} />
          <div className="banner">
            <img src={cover} alt="cover" />
            <div className="rightBanner">
              <div className="bannerHeading">
                <p>Browse our new premuim collection</p>
              </div>

              <div className="bannerButton">
                <a href="/products">
                  <button>Shop Now</button>
                </a>
              </div>
            </div>
          </div>
          <h1 className="homeHeading">featured products</h1>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
