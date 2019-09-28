import React, { Component } from 'react'
import ReactToPrint from 'react-to-print';

export class modalReciept extends Component {
  render() {
    return (
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
    )
  }
}

export default modalReciept
