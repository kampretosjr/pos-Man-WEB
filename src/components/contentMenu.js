import React, { Component } from 'react';
import { Container, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap'
import Modaladd from './modaladd';
import ReactToPrint from 'react-to-print';
import Menulist from './menulist';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import '../assets/css/modalChart.css';
import { postHistory } from '../redux/actions/history';
import { logoutUser } from '../redux/actions/user';
import { cartPlus, cartMinus, cartQty } from '../redux/actions/cart';
var cart = []
const dataStorage = JSON.parse(localStorage.getItem("data")) || ""

export class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      stateCart: cart,
      qty: 0,
      total: 0,
      allPrice: 0,
      allItem: [],
      historyPush: []

    };
    this.toggle = this.toggle.bind(this);
    this.nambahKeranjang = this.nambahKeranjang.bind(this)
  }

  increment(item) {
    var id = this.state.stateCart.indexOf(item)
    this.setState({
      cart: this.state.stateCart[id].quantity += 1,
      qty: this.state.qty += 1,
      allPrice: (this.state.allPrice - (item.price * (item.quantity - 1))) + (item.price * item.quantity)
    })
    this.props.dispatch(cartQty(+1))
  }

  decrement(item) {
    var id = this.state.stateCart.indexOf(item)
    this.setState({
      cart: this.state.stateCart[id].quantity -= 1,
      qty: this.state.qty -= 1,
      allPrice: (this.state.allPrice - item.price)
    })
    this.props.dispatch(cartQty(-1))
  }

  nambahKeranjang = (item) => {
    var id = this.state.stateCart.indexOf(item)
    let index = cart.indexOf(item)
    if (index === -1) {
      this.props.dispatch(cartQty(+1))
      cart.push(item)
      item.quantity = 1
    } else {
      console.log('item.quantity :', item.quantity);
      this.props.dispatch(cartQty(-item.quantity))
      cart.splice(index, 1)
      item.quantity = 0
    }
    this.setState({
      allPrice: (this.state.allPrice - (item.price * (item.quantity - 1))) + (item.price * item.quantity),
      qty: this.state.qty += 1,
      cart: cart
    })
  }

  cancel = () => {

    cart.splice(0, [cart.length])
    this.props.dispatch(cartQty(0))

    this.setState({
      allPrice: 0,
      stateCart: cart,
      qty:0
    })

  }

  LogoutHandler = async (id) => {
    await this.props.dispatch(logoutUser(id))
      .then(() => {
        Swal.fire({
          type: 'success',
          title: 'Logout',
          text: 'Logout Success!'
        }).then(function () {
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
    let receiptNo = Math.floor((Math.random() * 1000000000) + 1)
    const { stateCart, qty, allPrice, total } = this.state
    console.log('stateCart', stateCart)
    const insertList = async () => {
      stateCart.map((item, key) => {
        return (
          this.state.allItem.push(item.quantity + 'x ' + item.item_name)
        )
      })

      this.state.historyPush.push({
        item_list: this.state.allItem.join(", "),
        id_kasir: dataStorage.id_user,
        transaksi: this.state.allPrice,
        no_reciept: Math.floor((Math.random() * 1000000000) + 1)
      })

     
      this.props.dispatch(postHistory(this.state.historyPush))
        .then(() => {
          Swal.fire({
            type: 'success',
            title: 'Menu',
            text: 'Berhasil di tambah!',
          }).then(function () {
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

        <div >
          <Row>
            <div class="col-md-1  " style={{position:"sticky" }}>
              <ul class="nav flex-column navbar-light bg-white shadow p-3 mb-5 rounded " style={{ height:"100%"}} > 
                <li data-toggle="tooltip"  title="add menu" onClick={this.toggle} >
                  <a className="nav-link" >
                    <img src={require("../assets/images/tambah.png")} style={{ width: "100%",  }} alt="menu" />
                  </a>
                </li>
                <li class="nav-item">
                  <Link data-toggle="tooltip"  title="menu" to="/menu">
                    <a className="nav-link" >
                      <img src={require("../assets/images/fork.png")} style={{ width: "100%",  }} alt="menu" />
                    </a>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link data-toggle="tooltip"  title="History" to="/history">
                    <a className="nav-link">
                      <img src={require("../assets/images/clipboard.png")} style={{ width: "100%",  }} alt="menu" />
                    </a>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link data-toggle="tooltip"  title="Log out" onClick={() => this.LogoutHandler(dataStorage.id_user)}>
                    <a className="nav-link">
                      <img src={require("../assets/images/signout.png")} style={{ width: "100%",  }} alt="add menu" />
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div class="col-md-8  ">
              <Container >
                <Menulist addCart={(item) => { this.nambahKeranjang(item) }} />
              </Container>
            </div>

            <div class="col-md-3  " >
              <Nav vertical className="shadow-sm bg-white full-height">
                {stateCart && stateCart.length > 0 ?
                  <NavItem>
                    {stateCart.map((item, key) => {
                      return (
                        <Card style={{ width: '100%', height: '100%', marginBottom: '2%' }} key={key}>
                          <CardBody>
                          <table style={{ width: '100%', height: '100%', marginBottom: '2%' }} >
                            <tr>
                              <td align="center" rowspan="2">
                                <img src={item.item_image} alt={item.item_image} style={{ width: 100}} />
                              </td>
                              <td>
                                <CardTitle style={{ textAlign: 'center' }}>{item.item_name}</CardTitle>
                              </td>
                              <td ><CardSubtitle style={{ fontSize: 12,textAlign: 'center' }}>{item.price * item.quantity}</CardSubtitle></td>
                            </tr>
                            <tr>
                              <td align="center" colspan="2">
                                    {item.quantity <= 1 ?
                                      <Button disabled outline color="success" onClick={() => this.decrement(item)}>-</Button>
                                      : <Button outline color="success" onClick={() => this.decrement(item)}>-</Button>
                                    }
                                    <Button outline color="danger" disabled style={{ margin:"5%" }} >{item.quantity}</Button>
                                    <Button outline color="success"  onClick={() => this.increment(item)}>+</Button>
                              </td>
                            </tr>
                          </table>
                          </CardBody>
                          {/* <CardBody>
                            <Row>
                              <Col md="2">
                                <img src={item.item_image} alt={item.item_image} style={{ width: "200%",  }} />
                              </Col>

                              <Col md="7" >
                                <Row>
                                  <Col>
                                    <CardTitle>{item.item_name}</CardTitle>
                                  </Col>
                                  <Col><CardSubtitle style={{ fontSize: 12 }}>{item.price * item.quantity}</CardSubtitle></Col>

                                </Row>
                                
                                <Row>
                                  <Col>
                                    {item.quantity <= 1 ?
                                      <Button disabled outline color="success" onClick={() => this.decrement(item)}>-</Button>
                                      : <Button outline color="success" onClick={() => this.decrement(item)}>-</Button>
                                    }
                                    <Button outline color="danger" disabled style={{ margin:"5%" }} >{item.quantity}</Button>
                                    <Button outline color="success" onClick={() => this.increment(item)}>+</Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </CardBody> */}
                        </Card>
                      )
                    })}


                    <center class="nav-item shadow p-3  rounded ">
                      <Row style={{ marginTop: 20 }}>
                        <Col><Button disabled color="warning" style={{ width: '100%' }}>total {this.props.CartProps.CartQty} item : harga {allPrice} </Button></Col>
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
                  <div class="nav-item shadow p-3 rounded ">
                    <center>
                      <img src={require('../assets/images/food-and-restaurant.png')} alt="empty cart" />
                    </center>
                    <div style={{ textAlign: 'center' }}>
                      <h6>Your cart is empty</h6>
                      <p style={{ color: '#CECECE' }}>Please add some items from the menu</p>
                    </div>
                  </div>
                }
              </Nav>
            </div>
          </Row>
          <Modaladd toggle={this.toggle} modal={this.state.modal} />
        </div>
        <div>
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <div class="modal fade" ref={el => (this.componentRef = el)} id="myModal" role="dialog">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">

                <div class="modal-header">
                  <table style={{ width: '100%', border: 1 }}>
                    <tr>
                      <th>Receipt</th>
                      <th style={{ textAlign: 'right' }}>No #{receiptNo}</th>
                    </tr>
                    <tr>
                      <th>Cashier :</th>
                      <th style={{ textAlign: 'right' }}>{dataStorage.username}</th>
                    </tr>
                  </table>
                </div>
                <div class="modal-body">
                  <table style={{ width: '100%', border: 1 }}>

                    {stateCart.map((item, index) => {
                      return (
                        <>
                          <tr>
                            <td style={{ textAlign: 'left' }}>{item.item_name}</td>
                            <td style={{ textAlign: 'center' }}>{item.quantity} x</td>
                            <td style={{ textAlign: 'right' }}>Rp. {item.price * item.quantity}</td>
                          </tr>
                        </>
                      )
                    })
                    }
                    <br />
                    <tr>
                      <td colspan='2' style={{ textAlign: 'left' }}>Ppn 10%</td>
                      <td colspan='2' style={{ textAlign: 'right' }}>Rp. {allPrice / 100 * 10}</td>
                    </tr>
                    <tr>
                      <td colspan='2' style={{ textAlign: 'left' }}>Payment : Cash</td>
                      <td colspan='2' style={{ textAlign: 'right' }}>Total : Rp. {allPrice + (allPrice / 100 * 10)}</td>
                    </tr>

                  </table>
                </div>
                <div class="modal-footer">
                  <Row style={{ paddingLeft: 40, paddingRight: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <Button style={{ background: "#F24F8A", borderWidth: '0', textAlign: 'center' }} onClick={() => insertList()} block>bayar</Button>{' '}
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
    CartProps: state.reCart
  };
};

export default connect(mapStateToProps)(Content);
