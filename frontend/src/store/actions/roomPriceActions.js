import { EDIT_PRICE, INIT_PRICE } from "./action-types/roomPrice-actions";

export function fromPrices(values) {
  return {
    type: EDIT_PRICE,
    payload: values,
  };
}
export function initPrices(values) {
  return {
    type: INIT_PRICE,
    payload: values,
  };
}
