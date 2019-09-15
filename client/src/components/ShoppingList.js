import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';
import axios from 'axios';
import Item from './Item';
import ItemModal from './ItemModal';
// import AppNavbar from './AppNavBar';

class ShoppingList extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [{
        _id: '',
        name: '',
        isCompleted: ''
      }],
      newItemName: '',
      token: localStorage.getItem('token')
    };
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
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

    const token = this.state.token;
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    if(token){
      config.headers['x-auth-token'] = token;
    }

    axios.post('/api/items', newItem, config).then(res => {
      this.setState({ items: [...this.state.items, newItem], newItemName: ''  })
      this.getAllItems();
    })
    .catch(function(err){
      console.log(err)
    })
  }

  onDeleteClick(_id){      

    const token = this.state.token;
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    if(token){
      config.headers['x-auth-token'] = token;
    }
    
    axios.delete(`/api/items/${_id}`, config).then(res => {
      this.getAllItems()
    })
    .catch(err => {
      console.log(err)
    })  
  }

  onEditClick(item, _id){   

    const token = this.state.token;
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    if(token){
      config.headers['x-auth-token'] = token;
    }

    axios.put(`/api/items/${_id}`, {
       _id: item._id,
       name: item.name,
       isCompleted: item.isCompleted
    }, config )                          // token passed in here
    .then(res => {                                 
      this.getAllItems();
    })
    .catch(function(err){
      console.log(err)
    })
  }


  toggleComplete(index, item) {
    const items = this.state.items.slice();
    const completedItem = items[index];
    completedItem.isCompleted = completedItem.isCompleted ? false : true;
    // this.setState({ items: items }); just for local
    const _id = item._id;
    const token = this.state.token;
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    if(token){
      config.headers['x-auth-token'] = token;
    }
    axios.put(`/api/items/${_id}`, {
      _id: item._id,
      name: item.name,
      isCompleted: item.isCompleted 
    }, config )                          // token passed in here
    .then(res => {                                 
      this.getAllItems();
    })
    .catch(function(err){
      console.log(err)
    })
  }




  render() {
    return (


      // <ListGroup>

      //   {this.state.items.map( (item, index) => )}


      // </ListGroup>


      <div className="App">



        <ListGroup>
          { this.state.items.map( (item, index) => 
          <ListGroupItem>
            <Item 
                  key={ index } 
                  name={ item.name } 
                  id={item._id}
                  isCompleted={ item.isCompleted } 
                  toggleComplete={ () => this.toggleComplete(index, item) } 
                  onDeleteClick={ () => this.onDeleteClick(item._id) } 
                  onEditClick={(item) => this.onEditClick(item, item._id)}
              />
          </ListGroupItem>
          )}
        </ListGroup>

        {/* <div style={{listStyleType: "none"}}>
          { this.state.items.map( (item, index) => 
            <Item 
                  key={ index } 
                  name={ item.name } 
                  id={item._id}
                  isCompleted={ item.isCompleted } 
                  toggleComplete={ () => this.toggleComplete(index, item) } 
                  onDeleteClick={ () => this.onDeleteClick(item._id) } 
                  onEditClick={(item) => this.onEditClick(item, item._id)}
              />
          )}
        </div> */}

        {/* { this.state.items.map( (item, index) => 
            <ItemModal 
            key={ index } 
            onEditClick={(item) => this.onEditClick(item, item._id)}
            id={item._id}
            isCompleted={item.isCompleted}
            /> 
          ) } */}




        <form onSubmit={ (e) => this.addItem(e) } >
           <input type="text" value={ this.state.newItemName } onChange={ (e) => this.handleChange(e) } />
           <input type="submit" />
        </form>

      </div>


    );
  }
}

export default ShoppingList;
