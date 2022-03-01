import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    dispatch({ type: "loginSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.error });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "registerUserRequest" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post("/api/v1/register", userData, config);

    dispatch({ type: "registerUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({
      type: "registerUserFail",
      payload: error.response.data.error,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });
    const { data } = await axios.get("/api/v1/profile");
    dispatch({ type: "loadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.error });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch({ type: "logoutSuccess" });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "clearErrors" });
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      "/api/v1/profile/update",
      userData,
      config
    );

    dispatch({ type: "updateProfileSuccess", payload: data.user });
  } catch (error) {
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.error,
    });
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: "updatePasswordRequest" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      "/api/v1/password/update",
      passwords,
      config
    );

    dispatch({ type: "updatePasswordSuccess", payload: data.user });
  } catch (error) {
    dispatch({
      type: "updatePasswordFail",
      payload: error.response.data.error,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgotPasswordRequest" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
    dispatch({ type: "forgotPasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFail",
      payload: error.response.data.error,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: "resetPasswordRequest" });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      password,
      config
    );
    dispatch({ type: "resetPasswordSuccess", payload: data.status });
  } catch (error) {
    dispatch({
      type: "resetPasswordFail",
      payload: error.response.data.error,
    });
  }
};
