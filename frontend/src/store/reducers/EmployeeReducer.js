
import { combineReducers } from "redux";

const initState = {};

const EmplyeeReducer = ( state = initState,action, ) => {
    if(action.type == 'EMPLOYEE_LOGIN'){
        state = {loggedIn : true}
    }
  return state
};

export default combineReducers({ EmplyeeReducer });