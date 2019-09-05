import React, { Component, Fragment } from "react";
import "../assets/home.css";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Menu from "../components/Menu";
import Header from "../components/Header";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="d-flex" id="wrapper">
          <div className="bg-light border-right" id="sidebar-wrapper">
            <Menu />
          </div>
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <ProductList />
            </div>
          </div>
          <div className="cart-content-wrapper">
            <Cart />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
