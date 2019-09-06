import React, { Component } from 'react';
import { Container, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalBody, Row, Col ,Navbar,NavbarBrand,Badge} from 'reactstrap'
import Modaladd from './modaladd';
import ReactToPrint from 'react-to-print';
import Menulist from './menulist';
import { Link } from 'react-router-dom'
import {logoutUser} from '../redux/actions/user';
import Swal from 'sweetalert2'
import {connect} from 'react-redux';
import '../assets/css/modalChart.css';
import { postHistory } from '../redux/actions/history';

var cart = []
const dataStorage = JSON.parse(localStorage.getItem("data")) || ""  

export class Content extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        stateCart:cart,
        qty:0,
        total:0,
        allPrice:0,
        allItem:[],
        historyPush:[]

      };
      this.toggle = this.toggle.bind(this);
      this.nambahKeranjang = this.nambahKeranjang.bind(this)

    }
    
		increment(item) {     
      var id = this.state.stateCart.indexOf(item)
        this.setState({
          cart: this.state.stateCart[id].quantity += 1,
          qty: this.state.qty += 1,
          allPrice:item.price * this.state.qty
        })
      }

      decrement(item) {
        var id = this.state.stateCart.indexOf(item)
        this.setState({
          cart: this.state.stateCart[id].quantity -= 1,
          qty: this.state.qty -= 1,
          allPrice:item.price * this.state.qty
        })
      }

      nambahKeranjang = (item) => {
        let index = 	cart.indexOf(item)
        if (index === -1) {
          cart.push(item)
        } else {
          cart.splice(index, 1)
        }
        this.setState({
          cart: cart
        })
      }

      cancel = () => {

        cart.splice(0,[cart.length])

        this.setState({
          stateCart:cart
        })

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

    PushHistory = async (formdata) =>{
      this.state.stateCart.map((item, key) => {
        return (
          this.state.allItem.push(item.quantity + 'x ' + item.item_name)
        )})
      console.log('formdata', formdata)


    
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    render() {
      let receiptNo = Math.floor((Math.random() * 1000000000) + 1)
      const { stateCart ,qty,allPrice,total} = this.state
console.log('stateCart', stateCart)
        const insertList = async ()=>{
          stateCart.map((item, key) => {
            return (
              this.state.allItem.push(item.quantity + 'x ' + item.item_name)
            )})
// console.log('item', this.state.allItem.join(", "),)
          this.state.historyPush.push({
            item_list:this.state.allItem.join(", "),
            id_kasir:dataStorage.id_user,
            transaksi:this.state.allPrice,
            no_reciept:Math.floor((Math.random() * 1000000000) + 1) 
          })
    
        //   const data = this.state.historyPush
        //   console.log('data', data)
          this.props.dispatch(postHistory(this.state.historyPush))
            .then(() => {
            Swal.fire({
              type: 'success',
              title: 'Menu',
              text: 'Berhasil di tambah!',
            }).then(function(){ 
              window.location.reload();
              }
            );
        })
        .catch((error) => {
          console.log(error)
            Swal.fire({	
              type: 'error',
              title: 'Add Menu',
              text: 'Failed To Add Menu'
            })
          })
        }
        return (

          <>
          <Row>

          <Col style={{left:'74%',marginTop:'-4%',paddingBottom:'5%'}} md="3">
            <Navbar color="faded" light className="shadow-sm" style={{ backgroundColor: 'white' }}>
              <NavbarBrand className="m-auto">Cart <Badge style={{ backgroundColor: '#56cad5' }}>{qty}</Badge></NavbarBrand>
            </Navbar>
          </Col>
          </Row>
            <div class="container-fluid">
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
                                            {item.quantity <= 0 ? 
                                              <Button disabled outline color="success" onClick={() => this.decrement(item)}>-</Button>
                                            : <Button  outline color="success" onClick={() => this.decrement(item)}>-</Button>
                                            }
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
																						<Col><CardSubtitle style={{ fontSize: 12 }}>{item.price * item.quantity}</CardSubtitle></Col>
																					</Row>
																				</Col>

																			</Row>
																		</CardBody>
																	</Card>
																)
														})}


                            <center>
                              <Row style={{ marginTop: 20 }}>
                                <Col><Button disabled color="warning" style={{ width: '100%' }}>total {qty} item : harga {allPrice} </Button></Col>
                              </Row>  
                              <Row style={{ marginTop: 20 }}>
                                <Col><Button data-toggle="modal" data-target="#myModal" color="success" style={{ width: '100%' }}>Checkout</Button></Col>
                              </Row>
                              <Row style={{ marginTop: 20 }}>
                                <Col><Button color="secondary" onClick={() => this.cancel()} style={{ width: '100%' }}>Cancel</Button></Col>
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
                </div>
                <div>
{/* /////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <div class="modal fade" ref={el => (this.componentRef = el)} id="myModal" role="dialog">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                      <Row style={{ padding: 20 }}>
                                <Col>
                                    <h5>Receipt</h5>
                                    <h6>Cashier : {dataStorage.username}</h6>
                                </Col>
                                <Col md={{ size: 5, offset: 16 }}>
                                    <h5>Receipt No #{receiptNo}</h5>
                                </Col>
                            </Row>
                      </div>
                      <div class="modal-body">
                      {
                          stateCart.map((item, index) => {
                            return (
                              <>
                                <Row style={{ marginLeft: 20 }}>
                                  <Col md={{ size: 3 }}>
                                    <h6>{item.item_name}</h6>
                                  </Col>
                                  <Col md={{ size: 1 }}>
                                    <h6>{item.quantity} x</h6>
                                  </Col>
                                  <Col md={{ size: 4, offset: 9 }}>
                                    <h6>Rp. {item.price * item.quantity}</h6>
                                  </Col>
                                </Row>
                              </>
                            )
                          })
                        }
                          <Row style={{ marginLeft: 20 }}>
                              <Col md={{ size: 5 }}>
                                  <h6>Ppn 10%</h6>
                              </Col>
                              <Col md={{ size: 4, offset: 9 }}>
                                  <h6>Rp. {allPrice/100*10}</h6>
                              </Col>
                          </Row>
                          <Row style={{ marginLeft: -10 }}>
                              <Col md={{ size: 5, offset: 9 }}>
                                  <h6>Total : Rp. {allPrice+(allPrice/100*10)}</h6>
                              </Col>
                          </Row>
                          <Row>
                              <Col md={{ offset: 1 }}>
                              <h6>Payment : Cash</h6>
                              </Col>
                          </Row>
                      </div>
                      <div class="modal-footer">
                        <Row style={{paddingLeft: 40, paddingRight:40, justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                          <Button style={{ background: "#F24F8A", borderWidth: '0' }} onClick={() => insertList()} block>bayar</Button>{' '}
                          <h6 >Or</h6>
                          <ReactToPrint
                  trigger={() => <Button style={{ background: "#57CAD5", borderWidth: '0' }} onClick={this.toggle} block>print</Button>}
                  content={() => this.componentRef}
                />
                          
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
      </div>      
            


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
