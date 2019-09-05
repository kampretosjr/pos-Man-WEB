import React, { Component } from 'react';
import Navbars from '../components/navbar';
import Content from '../components/contentMenu';

export class Home extends Component {
    render() {
        return (
            <div>
                <Navbars title="Fooood"/>
                <Content />
            </div>
        );
    }
}

export default Home;
