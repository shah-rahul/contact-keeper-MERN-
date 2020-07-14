import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../Types';
const AuthState = (props) => {
  const initialstate = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialstate);
  //   load user
  // register user
  const register = async (formData) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      }); 
    }
  };
  //  login user
  // logout
  // clear errors
  const clearErrors =()=> dispatch({
    type: CLEAR_ERRORS
  });
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearErrors,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
