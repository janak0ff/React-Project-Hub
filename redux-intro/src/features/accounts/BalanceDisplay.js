import { connect } from "react-redux";


// Define a function to format currency using Intl.NumberFormat
function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}


// Define the component to display the balance
function BalanceDisplay({balance}) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

// Export the connected component instead of the original component
function mapStateToProps(state) {
  return { balance: state.account.balance };
}


// Connect the component to Redux store
export default connect(mapStateToProps)(BalanceDisplay); // BalanceDisplay;
