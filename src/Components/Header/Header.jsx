import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logos from "../Assets/logos.svg"
import "./Header.css"


function Heade() {
  return (
    <div>
     
     <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
      <Container>
        <Navbar.Brand href="#home">  <img src={logos}/> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='bgg' />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className=" ">
            <Nav.Link href="#features" className='text-dark  nav_lin ms-4 mt-2'>Ipo  </Nav.Link>
            <Nav.Link href="#pricing" className='text-dark  nav_lin ms-4 mt-2'>Referall  3 Earn </Nav.Link>
            <Nav.Link href="#pricing" className='text-dark  nav_lin ms-4 mt-2'> How to Earn </Nav.Link>
            <Nav.Link href="#pricing" className='text-dark  nav_lin ms-4 mt-2'> Roadmap </Nav.Link>
            <Nav.Link href="#pricing" className='text-dark  nav_lin ms-4 mt-2'> Partner </Nav.Link>
            <Nav.Link href="#pricing" className='text-dark  nav_lin ms-4 mt-2'> Documantion </Nav.Link>
            <Nav.Link href="#pricing" className='text-dark  nav_lin ms-4 mt-2'><button className='btn btn_nav'>Connect</button> </Nav.Link>
           
          </Nav>
       
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Heade
