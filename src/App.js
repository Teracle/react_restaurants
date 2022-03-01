import logo from './logo.svg';
import './App.css';

import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import About from './About'
import Restaurants from './Restaurants'
import Restaurant from './Restaurant'
import NotFound from './NotFound'

function App() {
  const [searchString,setSearchString]=useState('');
  
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
      e.preventDefault();
      navigate(`/restaurants?borough=${searchString}`)
      setSearchString(p=>p='');

      

  }

  
  return (
    <div>
      <Navbar bg="light" expand="lg">
 <LinkContainer to="/">
  <Navbar.Brand>New York Restaurants</Navbar.Brand>
 </LinkContainer>
 <Navbar.Toggle aria-controls="basic-navbar-nav" />
 <Navbar.Collapse id="basic-navbar-nav">
 <Nav className="mr-auto">
 <LinkContainer to="/restaurants">
 <Nav.Link>Full List</Nav.Link>
 </LinkContainer>
 <LinkContainer to="/about">
 <Nav.Link>About</Nav.Link>
 </LinkContainer>
 </Nav>
 <Form onSubmit={handleSubmit} inline>
 <FormControl type="text" placeholder="Borough" className="mr-sm-2" value={searchString} 
onChange={(e) => setSearchString(e.target.value)} />
 <Button type="submit" variant="outline-success">Search</Button>
 </Form>
 </Navbar.Collapse>
 </Navbar>
 <br />

 <Container>
 <Row>
 <Col>
 <Routes>
 <Route path='/' element={<Restaurants></Restaurants>}></Route>
 <Route path='/about' element={<About></About>}></Route>
 <Route path='/restaurants' element={<Restaurants></Restaurants>}></Route>
 <Route path='/restaurant/:id' element={<Restaurant></Restaurant>}></Route>
 <Route path='*' element={<NotFound></NotFound>}></Route>
 </Routes>
 </Col>
 </Row>
</Container>


   </div>
  );

  
}

export default App;
