import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NotificationsIcon from '@mui/icons-material/Notifications';

import PersonIcon from '@mui/icons-material/Person';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Header = () =>{
    return(
        <header>
            <Navbar collapseOnSelect expand="lg" className="custom-bg-light-blue">
        <Container>
          <Navbar.Brand href="./main" 
          style={{ fontFamily: 'TAEBAEK', fontWeight: 'bold', fontSize: '28px', color: 'yourColor' }}
          >Hansung Computer</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="1학년" style={{ fontFamily: 'TAEBAEK', fontWeight: 'bold', fontSize: '15px', color: 'black' }}
               id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/ComputerProgramming">컴퓨터프로그래밍</NavDropdown.Item>
                <NavDropdown.Item>웹프로그래밍</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="2학년" style={{ fontFamily: 'TAEBAEK', fontWeight: 'bold', fontSize: '15px', color: 'black' }}
              id="collapsible-nav-dropdown">
              <NavDropdown.Item>프로그래밍랩</NavDropdown.Item>
              <NavDropdown.Item>객체지향언어1</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="3학년" style={{ fontFamily: 'TAEBAEK', fontWeight: 'bold', fontSize: '15px', color: 'black' }}
            id="collapsible-nav-dropdown">
              <NavDropdown.Item>웹프레임워크</NavDropdown.Item>
              <NavDropdown.Item>설계패턴</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="4학년" style={{ fontFamily: 'TAEBAEK', fontWeight: 'bold', fontSize: '15px', color: 'black' }}
            id="collapsible-nav-dropdown">
              <NavDropdown.Item>캡스톤디자인</NavDropdown.Item>
              <NavDropdown.Item>클라우드컴퓨팅</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>

              <Nav.Link href="#deets"></Nav.Link>

              <Nav.Link href="#deets"><PersonIcon /></Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                <NotificationsIcon />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </header>
    )
}

export default Header;