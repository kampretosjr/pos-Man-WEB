import React, { Component } from 'react';
import Navbar from '../components/navbar';
import History from '../components/contentHistory';

export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div class="container-fluid">
                <Navbar title="riwayat transaksi" />
                <History />
            </div>
        );
    }
}

export default Home;
