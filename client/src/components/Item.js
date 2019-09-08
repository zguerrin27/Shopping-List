import React, { Component } from 'react';

class Item extends Component {

    render() {
        return (
          <li  >
            <input type="checkbox" checked={ this.props.isCompleted } onChange={ this.props.toggleComplete } style={{marginRight: "2rem"}} />
            <span style={{marginRight: "2rem"}} >{ this.props.name }</span>
            <button onClick={this.props.onDeleteClick}  > Delete </button>
          </li>
        );
      }
}

export default Item;