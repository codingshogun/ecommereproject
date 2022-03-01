export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "loginRequest":
    case "registerUserRequest":
    case "loadUserRequest":
      return {
        loading: true,
        isAuthenticated: false,
      };
    case "loginSuccess":
    case "registerUserSuccess":
    case "loadUserSuccess":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case "logoutSuccess":
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case "loginFail":
    case "registerUserFail":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "loadUserFail":
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "logoutFail":
      return {
        ...state,
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

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case "updateProfileRequest":
    case "updatePasswordRequest":
      return {
        ...state,
        loading: true,
      };
    case "updateProfileSuccess":
    case "updatePasswordSuccess":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case "updateProfileFail":
    case "updatePasswordFail":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "updateProfileReset":
    case "updatePasswordReset":
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case "updatePasswordRequest":
    case "resetPasswordRequest":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "forgotPasswordSuccess":
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case "resetPasswordSuccess":
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case "forgotPasswordFail":
    case "resetPasswordFail":
      return {
        ...state,
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
