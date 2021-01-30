  import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import AuthContext from '../services/Auth';
// import AdalConfig from '../config/AdalConfig';
// import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

const Header = () => {
  const scrollTo = id => e => {
    e.preventDefault();
    console.log("id", id);
    scroll.scrollTo({
      duration: 1500,
      delay: 100,
      smooth: "easeInOutQuint",
      containerId: id
    });

  };
  return (
    <header>
      <Navbar bg="none" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand
            href="#home"
            onClick={scrollTo("home")}
            aria-label="Logo"
          >
            MP-JES Invitado
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span />
            <span />
            <span />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Link
                href="#"
                className="nav-link"
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={0}
                duration={400}
              >
                Noticias
              </Link>
            
              <Link >
               <button type="button" className="btn btn-white" onClick={()=>AuthContext.logOut() }> Logout</button>
              </Link>
          </Nav>
         
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
