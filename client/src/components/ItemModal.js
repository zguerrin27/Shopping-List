import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { Model } from 'mongoose';


class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })  // this adds the e.t.val to the e.targe.name feature of the input in the formgroup
  }

  onSubmit = (e) => {
    e.preventDefault();   // stops form from default behavior 
    const newItemName = {
      name: this.state.name
    }
    console.log("FROM DA ITEM MODAL")
    console.log(newItemName)
    this.props.onEditClick(newItemName);   // Add new item via the addItem action that you grab from props
    this.toggle();  // close the modal
  }

  render(){
    return(
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          size="sm"
        >Edit Item</Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Item</ModalHeader>
          <ModalBody>
            <Form onSubmit={(name) => this.onSubmit(name)}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input 
                  type="text"
                  name="name"
                  id="item"
                  placeholder="New Name"
                  onChange={this.onChange}
                  ></Input>
                  <Button color="dark" style={{ marginTop: "2rem" }} block >Save</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }

}



export default ItemModal;