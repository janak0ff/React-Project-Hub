import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

// Export reducers and actions
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${currency}&symbols=USD`
    );
    const data = await res.json();
    console.log(data);
    const convertedAmount = data.rates.USD;
    // const convertedAmount = Object.values(data.rates)[0] * amount;

    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export default accountSlice.reducer; // Export the reducer, not the entire slice

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return { ...state, balance: state.balance + action.payload, isLoading: false, };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };

//     case "account/payLoan":
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: "",
//       };
//       case"account/convertingCurrency":
//       return{
//         ...state,
//         isLoading: true
//       }
//     default:
//       return state;
//   }
// }

// // build actions creator function
// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async function (dispatch, getState) {
//     dispatch({type: "account/convertingCurrency"})
//     const res = await fetch(
//       `https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${currency}&symbols=USD`
//     );
//     const data = await res.json();
//     console.log(data);
//     const convertedAmount = data.rates.USD;
//     // const convertedAmount = Object.values(data.rates)[0] * amount;

//     dispatch({ type: "account/deposit", payload: convertedAmount });

//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
