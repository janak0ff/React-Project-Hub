import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import accountReducer from "./features/accounts/accountSlice";
import CustomerReducer from "./features/customer/customerSlice";

// create a combined reducer function that handles both reducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: CustomerReducer
})


// create a Redux store instance and pass the combined reducer function
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));  

export default store;