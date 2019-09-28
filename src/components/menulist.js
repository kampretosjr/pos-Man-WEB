import React, { Component } from 'react';
import { Card, CardImg, CardBody, Container, CardSubtitle, Row, Col, Spinner } from 'reactstrap';
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

	angkaRP(angka) {
		var rupiah = '';
		var angkarev = angka.toString().split('').reverse().join('');
		for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
		return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
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

	render() {
		const { menus, isLoading } = this.state
		return (
			<div class="col-md-8" style={{ marginLeft: "8.25%" }}>
				<Container >
					<Row>
						{isLoading ?
							<Spinner color="success" className="m-auto mt-5" /> :
							menus && menus.length > 0 ?
								menus.map((item, key) => {
									return (
										<Col data-toggle="tooltip" data-placement="top" title={item.id_item} md="4" key={key}>
											<Card onClick={() => this.props.addCart(item)} className="mt-1 mb-auto" style={{ backgroundColor: 'transparent', borderColor: 'transparent', cursor: 'pointer' }}>
												<CardImg top width="100%" height="170" src={item.item_image} alt="Card image cap" />
												<CardBody>
													<h4>{item.item_name}</h4>
													<h6>{item.category_name}</h6>
													<CardSubtitle style={{ fontWeight: 'bold' }}>{this.angkaRP(item.price)}</CardSubtitle>
												</CardBody>
											</Card>
										</Col>
									)
								})
								:
								<p>oops no data!</p>
						}
					</Row>
				</Container>
			</div>
		)





	}
};

const mapStateToProps = state => {
	return {
		menu: state.reItem.itemList
	}
}

export default connect(mapStateToProps)(Menulist);