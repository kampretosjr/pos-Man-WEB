import React, { Component } from 'react';
import { Container, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap'
import ReactToPrint from 'react-to-print';
import Menulist from './menulist';
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import '../assets/css/modalChart.css';
import { postHistory } from '../redux/actions/history';
import { cartTotalPrice, cartOperator, cartQty,cartInternal, } from '../redux/actions/cart';
import Sidebar from "./sidebar";

var wik = []
const dataStorage = JSON.parse(localStorage.getItem("data")) || ""

export class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      stateCart: wik,
      total: 0,
      allPrice: 0,
      allItem: [],
      historyPush: []

    };
  }

  angkaRP(angka) {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
  };

  increment = async (item) => {
    var id = this.props.CartProps.CartList.indexOf(item)
    await this.setState({
      allPrice: (this.state.allPrice - (item.price * (item.quantity - 1))) + (item.price * item.quantity)
    })
    this.props.dispatch(cartQty(+1))
		this.props.dispatch(cartInternal("inc",id))
		this.props.dispatch(cartTotalPrice((this.state.allPrice - (item.price * (item.quantity - 1))) + (item.price * item.quantity)))
		
    console.log('price inc:', await this.state.allPrice);
  }

  decrement = async (item) => {
    var id = this.props.CartProps.CartList.indexOf(item)
    await this.setState({
      allPrice: (this.state.allPrice - item.price)
    })
    this.props.dispatch(cartQty(-1))
    this.props.dispatch(cartTotalPrice((this.state.allPrice - item.price)))
    this.props.dispatch(cartInternal("dec",id))
    console.log('price dec:', this.state.allPrice);
  }

	cancel = () => {
    this.props.dispatch(cartQty(0))
    this.props.dispatch(cartOperator("cancel"))
    this.setState({
      allPrice: 0,
      stateCart: wik,
    })
  }

  render() {
    let receiptNo = Math.floor((Math.random() * 1000000000) + 1)
    const { stateCart, qty, allPrice, total } = this.state
    console.log('alllllprice:', this.state.allPrice);
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
        
            <div class="col-md-3 "  >
              <Nav vertical className="shadow-sm bg-white full-height">
                {/* {stateCart && stateCart.length > 0 ? */}
                {this.props.CartProps.CartList && this.props.CartProps.CartList.length > 0 ?
                  <NavItem >
                    {/* {stateCart.map((item, key) => { */}
                    {this.props.CartProps.CartList.map((item, key) => {
                      return (
                        <Card style={{ width: '100%', height: '100%', marginBottom: '2%' }} key={key}>
                          <CardBody>
                            <table style={{ width: '100%', height: '100%', marginBottom: '2%' }} >
                              <tr>
                                <td align="center" rowspan="2">
                                  <img src={item.item_image} alt={item.item_image} style={{ width: 100 }} />
                                </td>
                                <td>
                                  <CardTitle style={{ textAlign: 'center' }}>{item.item_name}</CardTitle>
                                </td>
                                <td >
                                  <CardTitle style={{ fontSize: 12, textAlign: 'center' }}>
                                    {this.angkaRP(item.price * item.quantity)}
                                  </CardTitle>
                                </td>
                              </tr>
                              <tr>
                                <td align="center" colspan="2">
                                  {item.quantity <= 1 ?
                                    <Button disabled outline color="success" onClick={() => this.decrement(item)}>-</Button>
                                    : <Button outline color="success" onClick={() => this.decrement(item)}>-</Button>
                                  }
                                  <Button outline color="danger" disabled style={{ margin: "5%" }} >{item.quantity}</Button>
                                  <Button outline color="success" onClick={() => this.increment(item)}>+</Button>
                                </td>
                              </tr>
                            </table>
                          </CardBody>
                        </Card>
                      )
                    })}
                    <center class="nav-item shadow p-3  rounded ">
                      <Row style={{ marginTop: 20 }}>
                        <Col><Button disabled color="warning" style={{ width: '100%' }}>total : {this.props.CartProps.CartQty} item | harga : {this.props.CartProps.TotalPrice} </Button></Col>
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
        <div>
          {/* //////////modal//////////////////////////////////////////////////////////////// */}
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
                    {this.props.CartProps.CartList.map((item, index) => {
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
