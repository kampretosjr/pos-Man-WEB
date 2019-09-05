import React, {Component} from 'react';
import {connect} from 'react-redux';
import MaterialTable from 'material-table'
import moment from "moment";
import {getAllHistory} from '../redux/actions/history';
import {logoutUser} from '../redux/actions/user';
import { Row, Col, Container, Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const dataStorage = JSON.parse(localStorage.getItem("data")) || ""  

class histoooriii extends Component {
  //buat state kosong
  state = {
    DataHistory: [],
    button:0,
    timer:null
    };

  componentDidMount = async () => {
    await this.props.dispatch(getAllHistory());
    this.setState({
      DataHistory: this.props.history,
    });
  };

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
        
  render() {
    const arrayBaru = this.state.DataHistory
      return (
        <Container class="py-2 sticky-top flex-grow-1" fluid>
          <Row>
            <Col md="1">
                <Nav vertical className="shadow-sm bg-white rounded">
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
                  <Link data-toggle="tooltip" data-placement="right" title="add menu" to="/menu">
                    <a className="nav-link">
                      <img src={require("../assets/images/add.png")} style={{ width: 30, height: 30 }} alt="add menu" />
                    </a>
                  </Link>
                  <Link data-toggle="tooltip" data-placement="right" title="Log out" onClick={() =>this.LogoutHandler(dataStorage.id_user)}>
                    <a className="nav-link">
                      <img src={require("../assets/images/signout.png")} style={{ width: 30, height: 30 }} alt="add menu" />
                    </a>
                  </Link>
                </Nav>
            </Col>
            <Col md="8">
              <Container style={{ marginTop: "5%" }}>
              <div className="container">
              <div className="mt-5">
              <MaterialTable
                title="riwayat transaksi"
                columns={[
                  { title: 'no reciept',    field: 'a' },
                  { title: 'kasir',         field: 'b' },
                  { title: 'item list',     field: 'c' },
                  { title: 'transaksi',     field: 'd' },
                  { title: 'tanggal transaksi',     field: 'e' },
                  
                ]}
                data= {arrayBaru.map((ress, index) =>{
                  
                  return(
                          {
                            a: "# "+ress.no_reciept,
                            b: ress.username,
                            c: ress.item_list,
                            d: "Rp. "+ress.transaksi,
                            e: moment(ress.created_at).format("dddd,DD-MM-YYYY"),
                            
                          }
                        ) 
                      }
                    )
                  }       
                  
              />
              </div>
              </div>
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
        </Container>
        
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.reHistory.historyList,
  };
};

export default connect(mapStateToProps)(histoooriii);
