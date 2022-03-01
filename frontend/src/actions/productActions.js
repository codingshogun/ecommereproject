import axios from "axios";

export const getProduct =
  (search = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: "allProductRequest" });
      let link = `/api/v1/products?search=${search}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&avgRating[gte]=${ratings}`;
      if (category) {
        link = `/api/v1/products?search=${search}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&avgRating[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: "allProductSuccess",
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: "allProductFail",
        payload: err.response.data.error,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "productDetailsRequest" });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: "productDetailsSuccess",
      payload: data.product,
    });
  } catch (err) {
    dispatch({
      type: "productDetailsFail",
      payload: err.response.data.error,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "newReviewRequest" });
    const config = {
      headers: { "Content-type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: "newReviewSuccess",
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: "newReviewFail",
      payload: err.response.data.error,
    });
  }
};

export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: "adminProductRequest" });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({ type: "adminProductSuccess", payload: data.products });
  } catch (error) {
    dispatch({
      type: "adminProductFail",
      payload: error.resonse.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "newProductRequest" });
    const config = {
      headers: { "Content-type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: "newProductSuccess",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "newProductFail",
      payload: err.response.data.error,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: "deleteProductSuccess",
      payload: data.success,
    });
  } catch (err) {
    dispatch({
      type: "deleteProductFail",
      payload: err.response.data.error,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: "updateProductRequest" });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: "updateProductSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "updateProductFail",
      payload: error.response.data.error,
    });
  }
};
