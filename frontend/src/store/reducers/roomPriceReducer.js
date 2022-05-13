import { combineReducers } from "redux";

import {
  EDIT_PRICE,
  INIT_PRICE,
  RESET_PRICE,
} from "../actions/action-types/roomPrice-actions";

const initialState = {
  SINGLE_BEDROOM: 0,
  DOUBLE_BEDROOM: 0,
  SUITE_BEDROOM: 0,
  singleRoomCount: 1,
  doubleRoomCount: 1,
  suiteRoomCount: 1,
  initSingleRoom: 0,
  initDoubleRoom: 0,
  initSuiteRoom: 0,
};

const roomPriceReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PRICE:
      console.log(action.payload);
      state.SINGLE_BEDROOM = action.payload.single;
      state.DOUBLE_BEDROOM = action.payload.double;
      state.SUITE_BEDROOM = action.payload.suite;
      state.initSingleRoom = state.SINGLE_BEDROOM;
      state.initDoubleRoom = state.DOUBLE_BEDROOM;
      state.initSuiteRoom = state.SUITE_BEDROOM;
      return state;

    case EDIT_PRICE:
      console.log(action.payload);
      let roomType = action.payload.roomType.split("-")[1];
      let val;
      let amenity = action.payload.roomType.split("-")[0];
      if (roomType === "single" && amenity === "RoomCount") {
        val = Number(action.payload.amenityBool);

        state.singleRoomCount = val;
        state.SINGLE_BEDROOM = val * state.initSingleRoom;
      } else if (roomType === "double" && amenity === "RoomCount") {
        val = Number(action.payload.amenityBool);

        state.doubleRoomCount = val;
        state.DOUBLE_BEDROOM = val * state.initDoubleRoom;
      } else if (roomType === "suite" && amenity === "RoomCount") {
        val = Number(action.payload.amenityBool);

        state.suiteRoomCount = val;
        state.SUITE_BEDROOM = val * state.initSuiteRoom;
      } else if (roomType === "single" && action.payload.amenityBool)
        state.SINGLE_BEDROOM += 15;
      else if (roomType === "single" && !action.payload.amenityBool)
        state.SINGLE_BEDROOM -= 15;
      else if (roomType === "double" && action.payload.amenityBool)
        state.DOUBLE_BEDROOM += 15;
      else if (roomType === "double" && !action.payload.amenityBool)
        state.DOUBLE_BEDROOM -= 15;
      else if (roomType === "suite" && action.payload.amenityBool)
        state.SUITE_BEDROOM += 15;
      else if (roomType === "suite" && !action.payload.amenityBool)
        state.SUITE_BEDROOM -= 15;

      return state;
    case RESET_PRICE:
      state = initialState;
      return state;

    default:
      return state;
  }
};

export default combineReducers({ roomPriceReducer });
