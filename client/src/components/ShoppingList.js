import React, { Component } from 'react';
// import {
//   ListGroup,
//   ListGroupItem,
//   Button
// } from 'reactstrap';
import axios from 'axios';
import Item from './Item';
import ItemModal from './ItemModal';

class ShoppingList extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [{
        _id: '',
        name: '',
        isCompleted: ''
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

  addItem(e) {
    e.preventDefault();
    if (!this.state.newItemName) { return }
    const newItem = { name: this.state.newItemName, isCompleted: false };

    console.log("FROM DAAA ADDITEM CONTROLLER IN SHOPPING LIST")
    console.log(newItem)
 
    axios.post('/api/items', newItem).then(res => {
      this.setState({ items: [...this.state.items, newItem], newItemName: ''  })
      this.getAllItems();
    })
    .catch(function(err){
      console.log(err)
    })
  }

  onDeleteClick(_id){              
    axios.delete(`/api/items/${_id}`).then(res => {
      this.getAllItems()
    })
    .catch(err => {
      console.log(err)
    })  
  }

  onEditClick(item, _id){   

   
   
  
    console.log(item)


    axios.put(`/api/items/${_id}`, {
       _id: item._id,
       name: item.name,
       isCompleted: item.isCompleted
    })
    .then(res => {                                 
      this.getAllItems();
    })
    .catch(function(err){
      console.log(err)
    })
    

  }


  toggleComplete(index, _id) {
    const items = this.state.items.slice();
    const item = items[index];
    item.isCompleted = item.isCompleted ? false : true;
    this.setState({ items: items });
  }




  render() {
    return (
      <div className="App">

        <ul style={{listStyleType: "none"}}>
          { this.state.items.map( (item, index) => 
            <Item 
                  key={ index } 
                  name={ item.name } 
                  id={item._id}
                  isCompleted={ item.isCompleted } 
                  toggleComplete={ () => this.toggleComplete(index, item._id) } 
                  onDeleteClick={ () => this.onDeleteClick(item._id) } 
              />
              
          )}
          { this.state.items.map( (item, index) => 
            <ItemModal 
            key={ index } 
            onEditClick={(item) => this.onEditClick(item, item._id)}
            id={item._id}
            isCompleted={item.isCompleted}
            /> 
          ) }
        </ul>

        <form onSubmit={ (e) => this.addItem(e) } >
           <input type="text" value={ this.state.newItemName } onChange={ (e) => this.handleChange(e) } />
           <input type="submit" />
        </form>

      </div>


    );
  }
}

export default ShoppingList;
