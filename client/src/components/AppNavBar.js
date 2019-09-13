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

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  Logout(){
    localStorage.removeItem('token')
  }

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
                  <NavLink href="/" onClick={this.Logout} >
                    Log Out
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
