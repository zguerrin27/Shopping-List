import React, { Component } from 'react';

class Item extends Component {
    render() {
        return (
          <li>
            <input type="checkbox" checked={ this.props.isCompleted } onChange={ this.props.toggleComplete } />
            <span>{ this.props.name }</span>
            <button onClick={this.props.onDeleteClick}  > Delete </button>
          </li>
        );
      }
}

export default Item;