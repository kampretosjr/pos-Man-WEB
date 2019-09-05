import React, { Component } from "react";

class ProductList extends Component {
  render() {
    return (
      <div>
        <div className="row ml-3 mr-3 justify-content-center">
          <div className="col-md-3 mt-4">
            <div className="card" style={{ width: "12rem", borderRadius:"15px" }}>
              <img src="https://media.beritagar.id/brtgr-2012-11/64_nov29-glass-of-milk_1.jpg" style={{borderTopLeftRadius:"15px", borderTopRightRadius:"15px"}} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p>Rp. 5000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
