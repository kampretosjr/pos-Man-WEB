import React, { Component } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table'
import moment from "moment";
import { getAllHistory } from '../redux/actions/history';
import { logoutUser } from '../redux/actions/user';
import { Row, Col, Container, Nav, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Sidebar from "./sidebar";
import Rightbar from './rightbar';

const dataStorage = JSON.parse(localStorage.getItem("data")) || ""

class histoooriii extends Component {
  //buat state kosong
  state = {
    DataHistory: [],
    button: 0,
    timer: null
  };

  componentDidMount = async () => {
    await this.props.dispatch(getAllHistory());
    this.setState({
      DataHistory: this.props.history,
    });
  };

  render() {
    const arrayBaru = this.state.DataHistory
    return (
        <Row>
          <Sidebar/>
          <Col md="8" style={{ marginLeft: "8.25%" }}>
            <Container style={{ marginTop: -50 }}>
              <div className="container">
                <div className="mt-5">
                  <MaterialTable
                    title="riwayat transaksi"
                    columns={[
                      { title: 'no reciept', field: 'a' },
                      { title: 'kasir', field: 'b' },
                      { title: 'item list', field: 'c' },
                      { title: 'transaksi', field: 'd' },
                      { title: 'tanggal transaksi', field: 'e' },
                    ]}
                    data={arrayBaru.map((ress, index) => {
                      return (
                        {
                          a: "# " + ress.no_reciept,
                          b: ress.username,
                          c: ress.item_list,
                          d: "Rp. " + ress.transaksi,
                          e: moment(ress.created_at).format("dddd,DD-MM-YYYY"),
                        }
                      )
                    })}
                  />
                </div>
              </div>
            </Container>
          </Col>

          <Rightbar/>
        </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.reHistory.historyList,
  };
};

export default connect(mapStateToProps)(histoooriii);
