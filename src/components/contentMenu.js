import React, { Component } from 'react';
import { Row, Col, Container, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardSubtitle, Button ,Navbar,NavbarBrand,Badge} from 'reactstrap'
import Modaladd from './modaladd';
import Menulist from './menulist';
import { Link } from 'react-router-dom'
import {logoutUser} from '../redux/actions/user';
import Swal from 'sweetalert2'
import {connect} from 'react-redux';

var cart = []
const dataStorage = JSON.parse(localStorage.getItem("data")) || ""  

export class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            stateCart:cart,
            qty:1,
            total:0
        };
        this.toggle = this.toggle.bind(this);
        this.nambahKeranjang = this.nambahKeranjang.bind(this)

    }
    

		increment(item) {     
      
      var id = this.state.stateCart.indexOf(item)
      
     // this.state.stateCart[id]

      //var itemTemp = cart.find(keranjang => keranjang.id_item === item.id_item)
    //   var index = cart.indexOf(id)
    //   if (index !== -1) {
    //     cart[index].quantity = 1010;
    // }
    //     this.setState({
    //       cart: this.state.stateCart
    //     })
      console.log('array', this.state.stateCart[id])
      //  console.log('cart', this.state.stateCart.indexOf(item)) 
      this.setState({
        cart: this.state.stateCart[id].quantity += 1
      })
      }

      decrement(item) {
        var id = this.state.stateCart.indexOf(item)
        this.state.stateCart[id].quantity -= 1
         
      }

      nambahKeranjang = (item) => {
        let index = 	cart.indexOf(item)
        if (index === -1) {
          cart.push(item)
        } else {
          cart.splice(index, 1)
        }

        this.setState({
          cart: this.state.stateCart
        })
      }

      clicked = (param) => {
        let index = this.state.cart.indexOf(param)
        if (index === -1) {
          this.state.cartDetail.push({ jumlah: 1 })
          this.state.cart.push(param)
        } else {
          this.state.cart.splice(index, 1)
          this.state.cartDetail.splice(index, 1)
        }
        this.setState({ cart: this.state.cart })
        console.log(param, index, this.state);
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
      const { stateCart } = this.state
    //   console.log("cart",cart.map((item, key) => {
    //     return (
    //       item
    //     )
    // })  )
    console.log('data', this.state.stateCart)
        return (
          <>
          <Row>

          <Col style={{left:'74%',marginTop:'-4%',paddingBottom:'5%'}} md="3">
            <Navbar color="faded" light className="shadow-sm" style={{ backgroundColor: 'white' }}>
              <NavbarBrand className="m-auto">Cart <Badge style={{ backgroundColor: '#56cad5' }}>{this.state.stateCart.length}</Badge></NavbarBrand>
            </Navbar>
          </Col>
          </Row>
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
                            <Menulist addCart={(item) => { this.nambahKeranjang(item) }} />
                        </Container>
                    </Col>
                    <Col md="3">
                        <Nav vertical className="shadow-sm bg-white full-height">
                        { stateCart && stateCart.length > 0 ?
													<NavItem>
														{stateCart.map((item, key) => {
																return (
																	<Card style={{ width: '100%', height: '100%',marginBottom:'2%' }} key={key}>
																		<CardBody>
																			<Row>

																				<Col md="2">
																					<img src={item.item_image} alt={item.item_image} style={{ width: 50, height: 50 }} />
																				</Col>

																				<Col md="7" style={{paddingLeft:'10%'}}>
																					<Row>
																						<Col>
																							<CardTitle>{item.item_name}</CardTitle>
																						</Col>
																					</Row>
																					<Row>
																						<Col>
																							<Button outline color="success" onClick={() => this.decrement(item)}>-</Button>
                                              <Button outline color="success" >{item.quantity}</Button>
                                              <Button outline color="success" onClick={() => this.increment(item)}>+</Button>
																						</Col>
																					</Row>
																				</Col>

																				<Col md="3">
																					<Row>
																						<Col></Col>
																					</Row>
																					<Row>
																						<Col><CardSubtitle style={{ fontSize: 12 }}>{item.price * this.state.qty}</CardSubtitle></Col>
																					</Row>
																				</Col>

																			</Row>
																		</CardBody>
																	</Card>
																)
														})}
															<center>
                                <Row style={{ marginTop: 20 }}>
																	<Col><Button color="warning" style={{ width: '100%' }}>total</Button></Col>
																</Row>  
																<Row style={{ marginTop: 20 }}>
																	<Col><Button color="danger" style={{ width: '100%' }}>Checkout</Button></Col>
																</Row>
																<Row style={{ marginTop: 20 }}>
																	<Col><Button color="secondary" style={{ width: '100%' }}>Cancel</Button></Col>
																</Row>
															</center>
													</NavItem>
                                    :
                                    <NavItem>
                                        <center>
                                            <img src={require('../assets/images/food-and-restaurant.png')} alt="empty cart" />
                                        </center>
                                        <div style={{ textAlign: 'center' }}>
                                            <h6>Your cart is empty</h6>
                                            <p style={{ color: '#CECECE' }}>Please add some items from the menu</p>
                                        </div>
                                    </NavItem>
                            }
                        </Nav>
                    </Col>
                </Row>
                <Modaladd toggle={this.toggle} modal={this.state.modal} />
            </Container>
            </>
        );
    }
}

const mapStateToProps = state => {
  return {
    history: state.reHistory.historyList,
  };
};

export default connect(mapStateToProps)(Content);