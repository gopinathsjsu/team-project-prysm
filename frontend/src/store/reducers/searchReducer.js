import { combineReducers } from "redux";

import {
  FROM_DATE,
  TO_DATE,
  COUNTRY_INFO,
  CITY_INFO,
  GUESTS,
  ROOMS,
} from "../actions/action-types/search-actions";

const initialState = { GUESTS: 1, ROOMS: 1, COUNTRY_INFO: "", CITY_INFO : ""};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRY_INFO:
      state.COUNTRY_INFO = action.payload;
      return state;
    case CITY_INFO:
      state.CITY_INFO = action.payload;
      return state;
    case FROM_DATE:
      state.FROM_DATE = action.payload;
      return state;
    case TO_DATE:
      state.TO_DATE = action.payload;
      return state;
    case GUESTS:
      state.GUESTS = action.payload;
      return state;
    case ROOMS:
      state.ROOMS = action.payload;
      return state;

    default:
      return state;
  }
};

export default combineReducers({ searchReducer });
