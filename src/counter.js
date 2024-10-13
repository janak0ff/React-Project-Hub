import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props); // call the parent class's constructor
    this.state = { count: 5 }; // initial state
    this.handleDecrement = this.handleDecrement.bind(this); // bind this to the function
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    this.setState({ count: this.state.count - 1 }); // decrement
  }
  handleIncrement() {
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    const date = new Date("july 10 2027");
    date.setDate(date.getDate() + this.state.count); // increment date by count
    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>
          {date.toDateString()} [{this.state.count}]
        </span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;
