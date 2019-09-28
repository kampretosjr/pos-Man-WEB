import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Content from '../components/contentMenu';

export class Home extends Component {
    render() {
        return (
            <div class="container-fluid">
                <Navbar title="Food and beverage"/>
                <Content />
            </div>
        );
    }
}

export default Home;
