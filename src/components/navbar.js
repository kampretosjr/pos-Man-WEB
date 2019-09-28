import React from 'react'
import { useSelector } from 'react-redux'

export default function Navbar ({title}){
	const counter = useSelector(state => state.reCart.CartQty)
	
  return (
		<div class="sticky-top">
			<div class="row ">

				<div class="col-md-9  ">
					<nav class="navbar navbar-light bg-white shadow p-3 mb-5 bg-white rounded"  >
						<h5 class="col text-center font-weight-bold">{title}</h5>
					</nav>
				</div>

				<div class="col-md-3 ">
					<nav class="navbar navbar-light bg-white shadow p-3 mb-5 bg-white rounded"  >
						<h5 class="col text-center font-weight-bold">
							jumlah item <span class="badge badge-primary"> {counter}</span>
						</h5>
					</nav>                        
				</div>

			</div>
		</div>
	)
}




