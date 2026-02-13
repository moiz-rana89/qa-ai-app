import axios from "axios";
import Api from "../lib/api";
import * as types from "./types";
export function setLoaderAction(data) {
  return {
    type: types.IS_LOADING_AUTH,
    data,
  };
}
export function setIsAuthAction(data) {
  return {
    type: types.IS_AUTHENTICATED,
    data,
  };
}
export const logoutAction = () => ({
  type: types.LOGOUT,
});
export const login = async (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(setLoaderAction(true));
      const form = new FormData();
      form.append("username", email);
      form.append("password", password);
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        form
      );
      localStorage.setItem("auth_token", resp?.data?.access_token);
      localStorage.setItem("user_details", JSON.stringify(resp?.data?.user));
      dispatch(setLoaderAction(false));
      dispatch(setIsAuthAction(true));
    } catch (error) {
      dispatch(setLoaderAction(false));
      dispatch(setIsAuthAction(false));
    }
  };
};

export const logout = (navigate) => {
  return (dispatch) => {
    dispatch(setLoaderAction(true));
    Api.post("/logout")
      .then((resp) => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_details");
        dispatch(setLoaderAction(false));
        dispatch(setIsAuthAction(false));
      })
      .catch((err) => {
        dispatch(setLoaderAction(false));
      });
  };
};
