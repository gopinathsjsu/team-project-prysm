import { combineReducers } from "redux";

import {
  EDIT_PRICE,
  RESET_PRICE,
} from "../actions/action-types/roomPrice-actions";

const initialState = {
  singleBedroom: {
    type: "single",
    roomCount: null,
    swimmingPool: false,
    allMeals: false,
    jaccuzzi: false,
    breakFast: false,
    fitnessRoom: false,
    dailyParking: false,
  },
  doubleBedroom: {
    type: "double",
    roomCount: null,
    swimmingPool: false,
    allMeals: false,
    jaccuzzi: false,
    breakFast: false,
    fitnessRoom: false,
    dailyParking: false,
  },
  suiteBedroom: {
    type: "suite",
    roomCount: null,
    swimmingPool: false,
    allMeals: false,
    jaccuzzi: false,
    breakFast: false,
    fitnessRoom: false,
    dailyParking: false,
  },
};

const bookingPriceReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PRICE:
      console.log(action.payload);
      let roomType = action.payload.roomType.split("-")[1];
      let amenity = action.payload.roomType.split("-")[0];
      let amenityVal = action.payload.amenityBool;
      if (roomType === "single") {
        if (amenity === "RoomCount") {
          state.singleBedroom.roomCount = amenityVal;
        } else if (amenity === "Breakfast") {
          state.singleBedroom.breakFast = amenityVal;
        } else if (amenity === "AllMeals") {
          state.singleBedroom.allMeals = amenityVal;
        } else if (amenity === "Jacuzzi") {
          state.singleBedroom.jaccuzzi = amenityVal;
        } else if (amenity === "DailyParking") {
          state.singleBedroom.dailyParking = amenityVal;
        } else if (amenity === "SwimmingPool") {
          state.singleBedroom.swimmingPool = amenityVal;
        } else if (amenity === "FitnessRoom") {
          state.singleBedroom.fitnessRoom = amenityVal;
        }
      } else if (roomType === "double") {
        if (amenity === "RoomCount") {
          state.doubleBedroom.roomCount = amenityVal;
        } else if (amenity === "Breakfast") {
          state.doubleBedroom.breakFast = amenityVal;
        } else if (amenity === "AllMeals") {
          state.doubleBedroom.allMeals = amenityVal;
        } else if (amenity === "Jacuzzi") {
          state.doubleBedroom.jaccuzzi = amenityVal;
        } else if (amenity === "DailyParking") {
          state.doubleBedroom.dailyParking = amenityVal;
        } else if (amenity === "SwimmingPool") {
          state.doubleBedroom.swimmingPool = amenityVal;
        } else if (amenity === "FitnessRoom") {
          state.doubleBedroom.fitnessRoom = amenityVal;
        }
      } else if (roomType === "suite") {
        if (amenity === "RoomCount") {
          state.suiteBedroom.roomCount = amenityVal;
        } else if (amenity === "Breakfast") {
          state.suiteBedroom.breakFast = amenityVal;
        } else if (amenity === "AllMeals") {
          state.suiteBedroom.allMeals = amenityVal;
        } else if (amenity === "Jacuzzi") {
          state.suiteBedroom.jaccuzzi = amenityVal;
        } else if (amenity === "DailyParking") {
          state.suiteBedroom.dailyParking = amenityVal;
        } else if (amenity === "SwimmingPool") {
          state.suiteBedroom.swimmingPool = amenityVal;
        } else if (amenity === "FitnessRoom") {
          state.suiteBedroom.fitnessRoom = amenityVal;
        }
      }
      return state;
    case RESET_PRICE:
      state = initialState;
      return state;

    default:
      return state;
  }
};

export default combineReducers({ bookingPriceReducer });
