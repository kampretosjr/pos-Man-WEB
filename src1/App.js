import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import History from "./screens/History";
import Item from "./screens/Item";

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/history" component={History} exact />
        <Route path="/item" component={Item} exact />
      </div>
    );
  }
}

export default App;
