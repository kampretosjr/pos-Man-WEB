import React, { Component } from "react";
import "../assets/css/login.css";
import Background from "../assets/images/background.jpg";
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { postUserIn } from '../redux/actions/user'
import { Spinner } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: ""
    }
  }


  login(data) {
    if (this.state.email === '' || this.state.password === '') {
      Swal.fire({
        type: 'warning',
        title: 'Login',
        text: 'Isi data yang kosong dude'
      })
    } else {
      this.props.dispatch(postUserIn(data))
        .then(() => {
          Swal.fire({
            type: 'success',
            title: 'Login',
            text: 'Login Success!'
          }).then(function () {
            window.location.reload();
          }
          );
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            type: 'error',
            title: 'Login',
            text: 'Login Failed :('
          })
        })
    }
  }
  render() {
    let { email, password } = this.state
    let data = {
      email: email,
      password: password
    }
    console.log('email', this.state.email)
    console.log('password', this.state.password)

    return (
      <div>
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: `url(${Background})` }} >
            <div className="wrap-login100 p-t-30 p-b-50">
              <span className="login100-form-title p-b-41 mb-4">
                login kasir
              </span>
              <form className="login100-form validate-form p-b-33 p-t-5">
                {this.props.user.isLoading ?
                  <div>
                    <Spinner type="grow" color="primary" />
                    <Spinner type="grow" color="secondary" />
                    <Spinner type="grow" color="success" />
                    <Spinner type="grow" color="danger" />
                    <Spinner type="grow" color="warning" />
                    <Spinner type="grow" color="info" />
                    <Spinner type="grow" color="dark" />
                    <Spinner type="grow" color="info" />
                    <Spinner type="grow" color="warning" />
                    <Spinner type="grow" color="danger" />
                    <Spinner type="grow" color="success" />
                    <Spinner type="grow" color="secondary" />
                  </div>
                  :
                  <>
                    <div className="wrap-input100 validate-input">
                      <input className="input100" type="text" name="username" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
                      <span className="focus-input100" data-placeholder="📧" />
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Enter password" >
                      <input className="input100" type="password" name="pass" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
                      <span className="focus-input100" data-placeholder="🔑" />
                    </div>
                    <div className="row justify-content-center mt-3 baru">
                      <input type="submit" style={{ width: "100px" }} className="btn btn-outline-primary rounded-pill" value="Login" onClick={() => this.login(data)} />
                    </div>
                  </>
                }
              </form>
            </div>
          </div>
        </div>
        <div id="dropDownSelect1" />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.reUser
  }
}

export default connect(mapStateToProps)(Login);