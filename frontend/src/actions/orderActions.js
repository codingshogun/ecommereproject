import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "createOrderRequest" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatch({ type: "createOrderSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const myOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "myOrdersRequest" });

    const { data } = await axios.get("/api/v1/order/me");
    dispatch({ type: "myOrdersSuccess", payload: data.order });
  } catch (error) {
    dispatch({
      type: "myOrdersFail",
      payload: error.response.data.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "orderDetailsRequest" });

    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch({ type: "orderDetailsSuccess", payload: data.order });
  } catch (error) {
    dispatch({
      type: "orderDetailsFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "allOrdersRequest" });

    const { data } = await axios.get("/api/v1/admin/orders");
    dispatch({ type: "allOrdersSuccess", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "allOrdersFail",
      payload: error.response.data.message,
    });
  }
};

export const updateOrder = (id, order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "updateOrderRequest" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      order,
      config
    );
    dispatch({ type: "updateOrderSuccess", payload: data.success });
  } catch (error) {
    dispatch({
      type: "updateOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "deleteOrderRequest" });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch({ type: "deleteOrderSuccess", payload: data.success });
  } catch (error) {
    dispatch({
      type: "deleteOrderFail",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};
