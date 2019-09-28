import React, { Component } from 'react'
import { logoutUser } from '../redux/actions/user';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const dataStorage = JSON.parse(localStorage.getItem("data")) || ""
export class sidebar extends Component {
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
  render() {
    return (
      <div class="col-md-1  " style={{ position: "sticky" }}>
        <ul class="nav flex-column navbar-light bg-white shadow p-3 mb-5 rounded " style={{ height: "100%" }} >
          <li class="nav-item">
            <Link data-toggle="tooltip" title="menu" to="/menu">
              <a className="nav-link">
                <img src={require("../assets/images/fork.png")} style={{ width: 30, height: 30 }} alt="menu" />
              </a>
            </Link>
          </li>
          <li class="nav-item">
            <Link data-toggle="tooltip" title="History" to="/history">
              <a className="nav-link">
                <img src={require("../assets/images/clipboard.png")} style={{ width: 30, height: 30 }} alt="menu" />
              </a>
            </Link>
          </li>
          <li data-toggle="tooltip" title="add menu" onClick={this.toggle} class="nav-item">
            <a className="nav-link">
              <img src={require("../assets/images/tambah.png")} style={{ width: 30, height: 30 }} alt="menu" />
            </a>
          </li>
          <li class="nav-item">
            <Link data-toggle="tooltip" title="Log out" onClick={() => this.LogoutHandler(dataStorage.id_user)}>
              <a className="nav-link">
                <img src={require("../assets/images/signout.png")} style={{ width: 30, height: 30 }} alt="add menu" />
              </a>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default sidebar
