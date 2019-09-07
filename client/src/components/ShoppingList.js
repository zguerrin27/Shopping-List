import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';
import axios from 'axios';
import Item from './Item';

class ShoppingList extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [{
        _id: 'xyz',
        name: 'abc',
        isCompleted: false
      }],
      newItemName: ''
    };
  }

  componentDidMount(){
    this.getAllItems();
  }

  getAllItems(){
    axios.get('/api/items').then(res => {
      this.setState({
        items: res.data
      })
    })
  }

  handleChange(e) {
    this.setState({ newItemName: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newItemName) { return }
    const newItem = { name: this.state.newItemName, isCompleted: false };
    
    axios.post('/api/items', newItem).then(res => {
      this.setState({ items: [...this.state.items, newItem], newItemName: ''  })
    })
    .catch(function(err){
      console.log(err)
    })
  }

  onDeleteClick(_id){              
    console.log(_id)
    axios.delete(`/api/items/${_id}`).then(res => {
      this.getAllItems()
    })
    .catch(err => {
      console.log(err)
    })  
  }

  toggleComplete(index) {
    const items = this.state.items.slice();
    const item = items[index];
    item.isCompleted = item.isCompleted ? false : true;
    this.setState({ items: items });
  }


  render() {
    return (
      <div className="App">
        <ul>
          { this.state.items.map( (item, index) => 
            <Item 
                  key={ index } 
                  name={ item.name } 
                  isCompleted={ item.isCompleted } 
                  toggleComplete={ () => this.toggleComplete(index) } 
                  onDeleteClick={ () => this.onDeleteClick(item._id) } 
              />
          )}
        </ul>

        <form onSubmit={ (e) => this.handleSubmit(e) } >
           <input type="text" value={ this.state.newItemName } onChange={ (e) => this.handleChange(e) } />
           <input type="submit" />
        </form>

      </div>


    );
  }
}

export default ShoppingList;
