import React from 'react'
import {Link} from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container
} from 'reactstrap';

export const Heading = () => {
    return (
       <Navbar color="dark">
           <Container>
               <NavbarBrand href="/">Identity Portal</NavbarBrand>
               <Nav>
                   <NavItem>
                        <Link className="btn btn-primary mr-1" to="/loginForm"> Login </Link>
                       <Link className="btn btn-primary" to="/register"> Register </Link>
                   </NavItem>
               </Nav>
           </Container>
       </Navbar>
    )
}
