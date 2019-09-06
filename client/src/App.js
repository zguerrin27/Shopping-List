import React, { Component } from 'react';
import './App.css';
import Item from './components/Item';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [{
        _id: '',
        name: '',
        isCompleted: false
      }],
      newItemName: ''
    };
  }

  //{ name: 'Walk the cat', isCompleted: true }

  componentDidMount(){
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

  onDeleteClick(_id){                 // not working 
    console.log(_id)
    axios.delete('/api/items/:id')  
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
          { this.state.items.map( (item, index, _id) => 
            <Item 
                  key={ index } 
                  name={ item.name } 
                  isCompleted={ item.isCompleted } 
                  toggleComplete={ () => this.toggleComplete(index) } 
                  onDeleteClick={ () => this.onDeleteClick(_id) } 
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

export default App;