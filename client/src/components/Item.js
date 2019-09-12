import React, { Component } from 'react';
import {
  Button}
  from 'reactstrap';
  import ItemModal from './ItemModal';

class Item extends Component {

    render() {
        return (
          <div >
            <input type="checkbox" checked={ this.props.isCompleted } onChange={ this.props.toggleComplete } style={{marginRight: "2rem"}} />
            <span style={{marginRight: "2rem"}} >{ this.props.name }</span>
            <Button size="sm" onClick={this.props.onDeleteClick}> Delete </Button>
            {/* <ItemModal /> */}
          </div>
        );
      }
}

export default Item;