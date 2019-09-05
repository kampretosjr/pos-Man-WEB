import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from '../pages/home';
import History from '../pages/history';
import store from '../redux/store';
import Login from '../pages/Login';
const dataStorage = JSON.parse(localStorage.getItem("data"))  || ""

export class Routing extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                { dataStorage == "" ? 
                    <>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/history' component={Login} />
                        <Route exact path='/menu' component={Login} />
                    </>                           :
                    <>
                        <Route exact path='/' component={Home} /> 
                        <Route exact path='/menu' component={Home} />
                        <Route exact path='/history' component={History} />
                    </>
                }
                    
                </Router>
            </Provider>
        );
    }
}

export default Routing;
