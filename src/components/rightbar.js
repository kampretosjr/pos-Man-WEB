import React, { Component } from 'react'
import { Container, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap'
import { connect } from 'react-redux';

export class rightbar extends Component {
	render() {
		return (
			<div class="col-md-3 border " >
				<Nav vertical className="shadow-sm bg-white full-height">
					{stateCart && stateCart.length > 0 ?
						<NavItem>
							{stateCart.map((item, key) => {
								return (
									<Card style={{ width: '100%', height: '100%', marginBottom: '2%' }} key={key}>
										<CardBody>
											<Row>
												<Col md="2">
													<img src={item.item_image} alt={item.item_image} style={{ width: 50, height: 50 }} />
												</Col>

												<Col md="7" style={{ paddingLeft: '10%' }}>
													<Row>
														<Col>
															<CardTitle>{item.item_name}</CardTitle>
														</Col>
													</Row>
													<Row>
														<Col>
															{item.quantity <= 0 ?
																<Button disabled outline color="success" onClick={() => this.decrement(item)}>-</Button>
																: <Button outline color="success" onClick={() => this.decrement(item)}>-</Button>
															}
															<Button outline color="success" >{item.quantity}</Button>
															<Button outline color="success" onClick={() => this.increment(item)}>+</Button>
														</Col>
													</Row>
												</Col>

												<Col md="3">
													<Row>
														<Col></Col>
													</Row>
													<Row>
														<Col><CardSubtitle style={{ fontSize: 12 }}>{item.price * item.quantity}</CardSubtitle></Col>
													</Row>
												</Col>

											</Row>
										</CardBody>
									</Card>
								)
							})}


							<center>
								<Row style={{ marginTop: 20 }}>
									<Col><Button disabled color="warning" style={{ width: '100%' }}>total {qty} item : harga {allPrice} </Button></Col>
								</Row>
								<Row style={{ marginTop: 20 }}>
									<Col><Button data-toggle="modal" data-target="#myModal" color="success" style={{ width: '100%' }}>Checkout</Button></Col>
								</Row>
								<Row style={{ marginTop: 20 }}>
									<Col><Button color="secondary" onClick={() => this.cancel()} style={{ width: '100%' }}>Cancel</Button></Col>
								</Row>
							</center>
						</NavItem>
						:
						<NavItem>
							<center>
								<img src={require('../assets/images/food-and-restaurant.png')} alt="empty cart" />
							</center>
							<div style={{ textAlign: 'center' }}>
								<h6>Your cart is empty</h6>
								<p style={{ color: '#CECECE' }}>Please add some items from the menu</p>
							</div>
						</NavItem>
					}
				</Nav>
			</div>
		)
	}
}

export default rightbar
