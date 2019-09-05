import React, { Component } from 'react';
import { Row, Col, Container, Nav, NavItem, NavLink } from 'reactstrap'
import Modaladd from './modaladd';
import Menulist from './menulist';
import { Link } from 'react-router-dom'
import {logoutUser} from '../redux/actions/user';
import Swal from 'sweetalert2'
import {connect} from 'react-redux';

const dataStorage = JSON.parse(localStorage.getItem("data")) || ""  

export class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
		}
		
		LogoutHandler = async (id) =>{
			await this.props.dispatch(logoutUser(id))
				.then(() => {
				Swal.fire({
					type: 'success',
					title: 'Logout',
					text: 'Logout Success!'
				}).then(function(){ 
						window.location.reload();
						}
				);
			})
			.catch((error) => {
				console.log(error)
					Swal.fire({
						type: 'error',
						title: 'Logout',
						text: 'Logout Failed :('
					})
			})
		}

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    render() {
        return (
            
            <Container class="py-2 sticky-top flex-grow-1" fluid>
                <Row>
                    <Col md="1">
                        <Nav vertical className="shadow-sm bg-white rounded" style={{height:'100'}} >
												<Link data-toggle="tooltip" data-placement="right" title="List menu" to="/">
                            <a className="nav-link">
                              <img src={require("../assets/images/fork.png")} style={{ width: 30, height: 30 }} alt="menu" />
                            </a>
                          </Link>
                          <Link data-toggle="tooltip" data-placement="right" title="History" to="/history">
                            <a className="nav-link">
                              <img src={require("../assets/images/clipboard.png")} style={{ width: 30, height: 30 }} alt="menu" />
                            </a>
                          </Link>
													<NavLink href="#" className="m-auto" onClick={this.toggle}><img src={require("../assets/images/add.png")} style={{ width: 30, height: 30 }} alt="add menu" /></NavLink>
                          <Link data-toggle="tooltip" data-placement="right" title="Log out" onClick={() =>this.LogoutHandler(dataStorage.id_user)}>
                            <a className="nav-link">
                              <img src={require("../assets/images/signout.png")} style={{ width: 30, height: 30 }} alt="add menu" />
                            </a>
                          </Link>
                        </Nav>
                    </Col>
                    <Col md="8">
                        <Container style={{ marginTop: "5%" }}>
                            <Menulist />
                        </Container>
                    </Col>
                    <Col md="3">
                        <Nav vertical className="shadow-sm bg-white full-height">
                            <NavItem>
                                <center>
                                    <img src={require('../assets/images/food-and-restaurant.png')} alt="empty cart" />
                                </center>
                                <div style={{ textAlign: 'center' }}>
                                    <h6>Your cart is empty</h6>
                                    <p style={{ color: '#CECECE' }}>Please add some items from the menu</p>
                                </div>
                            </NavItem>
                        </Nav>
                    </Col>
                </Row>
                <Modaladd toggle={this.toggle} modal={this.state.modal} />
            </Container>
        );
    }
}

const mapStateToProps = state => {
  return {
    history: state.reHistory.historyList,
  };
};

export default connect(mapStateToProps)(Content);