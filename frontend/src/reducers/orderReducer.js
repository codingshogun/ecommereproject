export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "createOrderRequest":
      return {
        ...state,
        loading: true,
      };
    case "createOrderSuccess":
      return {
        loading: false,
        order: action.payload,
      };
    case "createOrderFail":
      return {
        loading: false,
        error: action.payload,
      };
    case "clearErrors":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "myOrdersRequest":
      return {
        loading: true,
      };
    case "myOrdersSuccess":
      return {
        loading: false,
        orders: action.payload,
      };
    case "myOrdersFail":
      return {
        loading: false,
        error: action.payload,
      };
    case "clearErrors":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case "orderDetailsRequest":
      return {
        loading: true,
      };
    case "orderDetailsSuccess":
      return {
        loading: false,
        order: action.payload,
      };
    case "orderDetailsFail":
      return {
        loading: false,
        error: action.payload,
      };
    case "clearErrors":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "allOrdersRequest":
      return {
        loading: true,
      };
    case "allOrdersSuccess":
      return {
        loading: false,
        orders: action.payload,
      };
    case "allOrdersFail":
      return {
        loading: false,
        error: action.payload,
      };
    case "clearErrors":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case "updateOrderRequest":
    case "deleteOrderRequest":
      return {
        ...state,
        loading: true,
      };
    case "updateOrderSuccess":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case "deleteOrderSuccess":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case "updateOrderFail":
    case "deleteOrderFail":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "updateOrderReset":
      return {
        ...state,
        isUpdated: false,
      };
    case "deleteOrderReset":
      return {
        ...state,
        isDeleted: false,
      };
    case "clearErrors":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
