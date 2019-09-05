import React, { Component } from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Row, Col,
    Spinner
} from 'reactstrap';
import { connect } from 'react-redux'

import { getAllItem } from '../redux/actions/item'

export class Menulist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            isLoading: true
        }
    }

    async componentDidMount() {
        await this.requestMenu()
    }

    requestMenu() {
        this.props.dispatch(getAllItem())
            .then(() => {
                this.setState({
                    menus: this.props.menu,
                    isLoading: false
                })
            })
            .catch((error) => {
                console.log('error ', error)
            })
    }

    textSplit(text) {
        if (text.length > 10) {
            let textSplit = text.substr(0, 25)
            return `${textSplit} ...`
        } else {
            let textSplit = text
            return `${textSplit}`
        }
    }

    render() {
        const { menus, isLoading } = this.state
        console.log('menu list: ', this.state.menus)
        return (
            <div>
                <Row>
                    {
                        isLoading ?
                            <Spinner color="success" className="m-auto mt-5" />
                            :
                            menus &&
                                menus.length > 0 ?
                                menus.map((item, key) => {

                                    return (
                                        <Col data-toggle="tooltip" data-placement="top" title={item.id_item} md="4" key={key}>
                                        
                                            <Card className="mt-1 mb-auto" style={{ backgroundColor: 'transparent', borderColor: 'transparent', cursor: 'pointer' }}>
                                                <CardImg top width="100%" height="170" src={item.item_image} alt="Card image cap" />
                                                <CardBody>
                                                    <h4>{item.category_name}</h4>
                                                    <h6>{item.item_name}</h6>
                                                    <CardSubtitle style={{ fontWeight: 'bold' }}>Rp. {item.price}</CardSubtitle>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    )
                                })
                                :
                            <p>oops no data!</p>
                    }
                </Row>

            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        menu: state.reItem.itemList
    }
}

export default connect(mapStateToProps)(Menulist);