import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
    fullName: "",
    nationalId: "",
    createdAt: "",
  };

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
       
      };
    default:
      return state;
  }
}

function CustomerReducer( state= initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {...state, fullName: action.payload.fullName, nationalId: action.payload.nationalId, createdAt: action.payload.createdAt };

        case "customer/updateName":
            return {...state, fullName: action.payload };
   
        default:
            return state;
    }
}

// create a combined reducer function that handles both reducers
const rootReducer = combineReducers({
    account: accountReducer,
    customer: CustomerReducer
})

// create a Redux store instance and pass the combined reducer function
const store = createStore(rootReducer); // store

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: 'buy a car' },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());



// build actions creator function
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
    return { type: "account/requestLoan", payload: { amount, purpose } };
}

function payLoan() {
  return { type: "account/payLoan" };
}


// dispatch actions
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());
store.dispatch(requestLoan(1000, 'buy a car'));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());


// build actions creator function for customer
function createCustomer (fullName, nationalId) {
    return { type: "customer/createCustomer", payload: { fullName, nationalId, createdAt: new Date().toISOString() } };
}

function updateName (fullName) {
    return { type: "customer/updateName", payload: fullName };
}

// dispatch actions
store.dispatch(createCustomer("janak shrestha", '1234567890')); // fullName, nationalId
store.dispatch(deposit(50));
console.log(store.getState());