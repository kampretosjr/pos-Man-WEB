import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

import { getAllCategory } from '../redux/actions/category'
import { postItem, getAllItem } from '../redux/actions/item'
export class Formadd extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            listCategory: [],
            name: '',
            image: '',
            price: 0,
            id_category: [],
        }
    }

    onChangeFile = (e) => {
        console.log(e.target.files[0])
        this.setState({
            image: e.target.files[0],
            loaded: 0,
        })
    }

    async componentDidMount() {
        await this.requestCategories()
    }

    componentWillMount() {
        this.requestMenu()
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

    requestCategories() {
        this.props.dispatch(getAllCategory())
            .then(() => {
                this.setState({
                    listCategory: this.props.category
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    addMenu(formdata) {
        this.props.dispatch(postItem(formdata))
            .then(() => {
                Swal.fire({
                    type: 'success',
                    title: 'Menu',
                    text: 'Berhasil di tambah!',
                }).then(function () {
                    window.location.reload();
                }
                );

            })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    type: 'error',
                    title: 'Add Menu',
                    text: 'Failed To Add Menu'
                })
            })
    }

    render() {
        const { listCategory, name, image, price, id_category } = this.state
        let formdata = new FormData
        formdata.append('item_name', name)
        formdata.append('item_image', image)
        formdata.append('price', price)
        formdata.append('id_category', id_category)
        console.log("id_category", this.state.id_category)
        return (
            <Form>
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>Name</Label>
                    <Col sm={10}>
                        <Input type="text" name="name" value={name} onChange={e => this.setState({ name: e.target.value })} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="examplePassword" sm={2}>Image</Label>
                    <Col sm={10}>
                        <Input type="file" name="image" onChange={this.onChangeFile} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>Price</Label>
                    <Col sm={10}>
                        <Input type="number" name="price" value={price} onChange={e => this.setState({ price: e.target.valueAsNumber })} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleSelect" sm={2}>Select</Label>
                    <Col sm={10}>
                        <select onChange={(e) => this.setState({ id_category: e.target.value })} className="form-control" required>
                            <option >--Pilih kategorinya--</option>

                            {listCategory.map((listCategory, index) => {
                                return (
                                    <option key={index} value={listCategory.id_category}>{listCategory.category_name}</option>
                                )
                            })}
                        </select >
                    </Col>
                </FormGroup>
                <FormGroup check row className="mt-4">
                    <Col>
                        <Button className="float-right" style={{ backgroundColor: '#F24F8A', borderColor: 'transparent' }} onClick={() => this.addMenu(formdata)}>Add</Button>
                    </Col>
                    <Col>
                        <Button className="float-right mr-3" style={{ backgroundColor: '#57CAD5', borderColor: 'transparent' }}>Cancel</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
        menu: state.reItem.itemList,
        category: state.reCategory.categoryList
    }
}

export default connect(mapStateToProps)(Formadd)