import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: "kathmandu" };
    this.fetchWether = this.fetchWether.bind(this);
  }

  fetchWether() {
    console.log(this);
  }
  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            placeholder="Enter location"
            value={this.state.location}
            onChange={(e) => this.setState({ location: e.target.value })}
          />
        </div>
        <button onClick={this.fetchWether}>Get Weather</button>
      </div>
    );
  }
}

export default App;
