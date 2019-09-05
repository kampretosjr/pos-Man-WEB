import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <i className="fa fa-bars fa-lg" aria-hidden="true" />
        </NavbarBrand>
        <div
          className="container mx-auto"
          style={{ width: "300px", justifyContent: "center" }}
        >
          <Nav navbar>
            <NavItem>
              <NavLink style={{ color: "white", fontSize: "20px" }}>
                Food Item
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <div style={{ width: "200px" }}>
          <input className="form-control form-control-sm" placeholder="Search item..." />
        </div>
        <div style={{ width: "400px", textAlign: "center", color: "white" }}>
          <NavLink>
            Cart
            <i className="fa fa-cart-plus fa-lg ml-2" aria-hidden="true" />
          </NavLink>
        </div>
      </Navbar>
    );
  }
}
