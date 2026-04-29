"use client"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../public/assets/logo2.png'
import Image from 'next/image';


export default function navbar() {
 
  return (
    <Navbar expand="lg" className="navbarColor p-2 title ">
      <Container fluid className='text-white'>
        <Navbar.Brand href="/"><Image src={Logo}alt="logo" width="150" height="70" ></Image></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 text-white "
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/" className='text-white'>Home</Nav.Link>
            <Nav.Link href="/characters" className='text-white'>Characters</Nav.Link>
            <Nav.Link href="/locations" className='text-white'>Locations</Nav.Link>
            <Nav.Link href="/episodes" className='text-white'>Episodes</Nav.Link>

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

