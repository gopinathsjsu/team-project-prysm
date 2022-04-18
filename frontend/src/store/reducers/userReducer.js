import { combineReducers } from "redux";
import { USER_INFO } from "../actions/action-types/user-actions";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default combineReducers({ userReducer });
