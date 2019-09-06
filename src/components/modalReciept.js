import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, Row, Col } from 'reactstrap';
import swal from 'sweetalert2'

export class modalReciept extends Component {

  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        cart: this.props.cart,
        dataKasir: this.props.kasir,
        harga: this.props.allPrice,
        qty:this.props.qty

    };

}

  render() {
    const { dataKasir,  cart, harga,qty} = this.state
    console.log('harga', harga)
    return (
      <div>
        <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
              <Row style={{ padding: 20 }}>
                        <Col>
                            <h5>Receipt</h5>
                            <h6>Cashier : {dataKasir.username}</h6>
                        </Col>
                        <Col md={{ size: 5, offset: 2 }}>
                            <h5>Receipt No tes</h5>
                        </Col>
                    </Row>
              </div>
              <div class="modal-body">
              {
                  this.state.cart.map((item, index) => {
                    return (
                      <>
                        <Row style={{ marginLeft: 20 }}>
                          <Col md={{ size: 5 }}>
                            <h6>{item.item_name}</h6>
                          </Col>
                          <Col md={{ size: 4, offset: 3 }}>
                            <h6>Rp. {item.price}</h6>
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
                      <Col md={{ size: 4, offset: 3 }}>
                          <h6>Rp. {harga/100*10}</h6>
                      </Col>
                  </Row>
                  <Row style={{ marginLeft: -10 }}>
                      <Col md={{ size: 5, offset: 7 }}>
                          <h6>Total : Rp. {harga+(harga/100*10)}</h6>
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
                  <Button style={{ background: "#F24F8A", borderWidth: '0' }}  block>Print</Button>{' '}
                  <h6 >Or</h6>
                  <Button style={{ background: "#57CAD5", borderWidth: '0' }} onClick={this.toggle} block>Send Email</Button>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// }

export default (modalReciept)
