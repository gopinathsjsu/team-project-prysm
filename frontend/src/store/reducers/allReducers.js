import { combineReducers } from "redux";
import { USER_LOGOUT } from "../actions/action-types/user-actions";
import userReducer from "./userReducer";
import roomReducer from "./roomReducer";
import searchReducer from "./searchReducer";
import roomPriceReducer from "./roomPriceReducer";
import bookingPriceReducer from "./bookingPriceReducer";

import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  userReducer,
  roomReducer,
  searchReducer,
  roomPriceReducer,
  bookingPriceReducer,
});

const allReducers = (state, action) => {
  if (action.type === USER_LOGOUT) {
    storage.removeItem("persist:root");
    state = undefined;
  }
  return rootReducer(state, action);
};

export default allReducers;
