import React, { useReducer } from "react";

import { v4 } from "uuid";
import setAuthtoken from "../../utills/setAuthtoken ";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
} from "../type";
import axios from "axios";
const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("item"),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: false,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  //LOAD USER      CHECK WHICH USER ARE LOGGED IN IT GONNA END POINT AND GET THE USER DATA
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthtoken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  //REGISTER USER     SIGN THE USER  UP AND GET THE TOKEN UP
  const register = async (FormData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/users", FormData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, //res.data is return token
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg, //res.data is return token
      });
      loadUser();
    }
  };
  //LOGIN IN  LOG THE USER AND GET THE TOKEN
  const login = async (FormData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth", FormData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data, //res.data is return token
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
      loadUser();
    }
  };
  //LOGOUT      DESTROY THE TOKEN
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  //CLEAR ERROROS
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
