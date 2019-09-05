import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Item extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    history: state.reItem.result,
  }; 
}


export default connect(mapStateToProps)(Item)


