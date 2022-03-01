export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "allProductRequest":
    case "adminProductRequest":
      return {
        loading: true,
        products: [],
      };
    case "allProductSuccess":
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
      };

    case "adminProductSuccess":
      return {
        loading: false,
        products: action.payload,
      };

    case "allProductFail":
    case "adminProductFail":
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "productDetailsRequest":
      return {
        loading: true,
        ...state,
      };
    case "productDetailsSuccess":
      return {
        loading: false,
        product: action.payload,
      };
    case "productDetailsFail":
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "newReviewRequest":
      return {
        loading: true,
        ...state,
      };
    case "newReviewSuccess":
      return {
        loading: false,
        success: action.payload,
      };
    case "newReviewFail":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "newReviewReset":
      return {
        ...state,
        success: false,
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

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "newProductRequest":
      return {
        loading: true,
        ...state,
      };
    case "newProductSuccess":
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case "newProductFail":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "newProductReset":
      return {
        ...state,
        success: false,
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

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case "deleteProductRequest":
    case "updateProductRequest":
      return {
        loading: true,
        ...state,
      };
    case "deleteProductSuccess":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case "updateProductSuccess":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case "deleteProductFail":
    case "updateProductFail":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "deleteProductReset":
      return {
        ...state,
        isDeleted: false,
      };

    case "updateProductReset":
      return {
        ...state,
        isUpdated: false,
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
