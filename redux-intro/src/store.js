const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",

}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "account/deposit":
            return {...state, balance: state.balance + action.payload}
        case "account/withdraw":
            return {...state, balance: state.balance - action.payload}
        case "account/requestLoan":
            if (state.balance > 0) return state;
        
            return {...state, loan:  action.payload.purpose}

            case "account/payLoan":
                return {...state, balance: state.balance - state.loan, loan: 0, loanPurpose: ""}
        default:
            return state; 
    }}