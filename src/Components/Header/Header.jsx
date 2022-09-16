import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logos from "../Assets/logo.png"
import "./Header.css"
// import { busdNftTokenAbi, busdNftTokenAddress, ULE_NFT_100, ULE_NFT_100_ABI, wireNftContractAbi, wireNftContractAddress, wireTokenAbi, wireTokenAddress } from '../../utilies/Bsc_contract';
import { loadWeb3 } from '../../apis/api';
import Web3 from 'web3'
import { toast } from 'react-toastify';

function Heade() {
  let [btnTxt, setBtTxt] = useState("Connect Wallet")


  const getaccount = async () => {
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      toast.error('please install metamask')
      setBtTxt("Install metamask")
    }
    else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network")
    } else {
      let myAcc = acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4);
      setBtTxt(myAcc);

    }
  }
  useEffect(() => {
    // getaccount()


  });


  return (
    <div>

      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="#home">  <img src={logos} style={{ height: "70px" }} /> </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className='bgg' />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className=" ">
              <Nav.Link href="#features" className='text-dark  nav_lin ms-4 mt-2'>Runx  </Nav.Link>
              <Nav.Link href="#pricing" className='text-dark  nav_lin ms-4 mt-2'>Referall  3 Earn </Nav.Link>
              <Nav.Link href="#pricing" className='text-dark  nav_lin ms-4 mt-2'> How to Earn </Nav.Link>
              <Nav.Link href="#pricing" className='text-dark  nav_lin ms-4 mt-2'> Roadmap </Nav.Link>
              <Nav.Link href="#pricing" className='text-dark  nav_lin ms-4 mt-2'> Partner </Nav.Link>
              <Nav.Link href="#pricing" className='text-dark  nav_lin ms-4 mt-2'> Documantion </Nav.Link>
              <Nav.Link href="#pricing" className='text-dark  nav_lin ms-4 '><button className='btn border text-white rounded-5' onClick={getaccount}>{btnTxt} </button> </Nav.Link>

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Heade
