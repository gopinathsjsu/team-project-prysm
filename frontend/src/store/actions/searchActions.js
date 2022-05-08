import {
  FROM_DATE,
  TO_DATE,
  COUNTRY_INFO,
  CITY_INFO,
  ROOMS,
  GUESTS,
} from "./action-types/search-actions";


export function fromDate(values) {
  return {
    type: FROM_DATE,
    payload: values,
  };
}

export function toDate(values) {
  return {
    type: TO_DATE,
    payload: values,
  };
}
export function countryInfo(values) {
  return {
    type: COUNTRY_INFO,
    payload: values,
  };
}

export function cityInfo(values) {
  return {
    type: CITY_INFO,
    payload: values,
  };
}
export function fromGuests(values) {
  return {
    type: GUESTS,
    payload: values,
  };
}

export function fromRooms(values) {
  return {
    type: ROOMS,
    payload: values,
  };
}