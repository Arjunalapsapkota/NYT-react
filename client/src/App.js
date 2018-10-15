import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Body />
      </div>
    );
  }
}

export default App;
