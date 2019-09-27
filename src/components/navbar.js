import React from 'react'
import { useSelector } from 'react-redux'

export default function Navbar ({title}){
	const counter = useSelector(state => state.reCart.CartCount)
	
  return (
		<div class="container-fluid sticky-top">
			<div class="row ">

				<div class="col-sm-9 border ">
					<nav class="navbar navbar-light bg-white shadow p-3 mb-5 bg-white rounded"  >
						<h5 class="col text-center font-weight-bold">{title}</h5>
					</nav>
				</div>

				<div class="col-sm-3 border">
					<nav class="navbar navbar-light bg-white shadow p-3 mb-5 bg-white rounded"  >
						<h5 class="col text-center font-weight-bold">
							keranjang belanja 
							<span class="badge badge-primary">{counter}</span>
						</h5>
					</nav>                        
				</div>
				
			</div>
		</div>
	)
}




