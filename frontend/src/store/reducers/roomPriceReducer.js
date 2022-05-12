import { combineReducers } from "redux";

import {
  EDIT_PRICE,
  INIT_PRICE,
} from "../actions/action-types/roomPrice-actions";

const initialState = {
  SINGLE_BEDROOM: 0,
  DOUBLE_BEDROOM: 0,
  SUITE_BEDROOM: 0,
};

const roomPriceReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PRICE:
      console.log(action.payload);
      state.SINGLE_BEDROOM = action.payload.single;
      state.DOUBLE_BEDROOM = action.payload.double;
      state.SUITE_BEDROOM = action.payload.suite;
      return state;

    case EDIT_PRICE:
      console.log(action.payload);
      let roomType = action.payload.roomType.split("-")[1];
      let amenity = action.payload.roomType.split("-")[0];
      if (roomType === "single" && action.payload.amenityBool)
        state.SINGLE_BEDROOM += 15;
      else if (roomType === "single" && !action.payload.amenityBool)
        state.SINGLE_BEDROOM -= 15;
      if (roomType === "double" && action.payload.amenityBool)
        state.DOUBLE_BEDROOM += 15;
      else if (roomType === "double" && !action.payload.amenityBool)
        state.DOUBLE_BEDROOM -= 15;
      if (roomType === "suite" && action.payload.amenityBool)
        state.SUITE_BEDROOM += 15;
      else if (roomType === "suite" && !action.payload.amenityBool)
        state.SUITE_BEDROOM -= 15;
      return state;

    default:
      return state;
  }
};

export default combineReducers({ roomPriceReducer });
