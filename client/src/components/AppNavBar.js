import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';


class AppNavbar extends Component {
  constructor(props){          
    super(props);
    this.state = {
      isOpen: false
    }
  }

// this.toggle = this.toggle.bind(this); This is normally in the state. 
// lifestyle methods come with the this keyword included..custom methods like the ones below do not. thats why you need this binded.
// A work around is to user an arrow function. 
// with an arrow function we also dont technically need a contructor function for state.. it could just be this.state = {isOpen:false}
 
  // toggle(){      // how it would be normally
  // toggle action
  // }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

    // style={{maxWidth: "75%", margin: "auto"}}
  render() {
    return (
      <div >
        <Navbar color="dark" dark expand="sm" className="mb-3"  >
          <Container>
            <NavbarBrand href="/">Shopping-List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/zguerrin27">
                    GitHub
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">
                    Login
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
