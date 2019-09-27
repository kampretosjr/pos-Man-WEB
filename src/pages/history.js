import React, { Component } from 'react';
import {navbar} from '../components/navbar';
import History from '../components/contentHistory';

export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <navbar title="riwayat transaksi" />
                <History />
            </div>
        );
    }
}

export default Home;
