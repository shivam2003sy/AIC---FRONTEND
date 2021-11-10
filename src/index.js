import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from "./User"
import {Route,BrowserRouter as Router, Switch,Link} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import { Navbar,Container,Nav} from 'react-bootstrap';
import logo from './logo.jpg'



import 'bootstrap/dist/js/bootstrap.bundle.min';
import {UserLocationProvider} from "./LocationContext";
ReactDOM.render(
  <React.StrictMode>

  <Router>
  <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand >
    <img
          alt=""
          src={logo}
          width="40"
          height="40"
          className="d-inline-block align-top"
        />{' '}
      Ambulance In Cloud</Navbar.Brand>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Link style={{textDecoration:'none'}} to='/'><Nav.Link href="#home">Help needed 24/7
        ?</Nav.Link></Link>
        <Link style={{textDecoration:'none'}} to='/login'><Nav.Link href="#link">Login as Ambulance</Nav.Link></Link>
        <Link style={{textDecoration:'none'}} to='/About'><Nav.Link href="#link">About project</Nav.Link></Link>

      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>




    <Switch>
      <Route path ="/sign-up" component={SignUp} />
      <Route path ="/login" component={Login} />
      <Route path="/:ambulanceid" component= {App} />
      <Route path ="/" exact component={UserPage} />
    </Switch>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

function UserPage ()  {

  return(
      <UserLocationProvider>
        <User/>
      </UserLocationProvider>
  )
}
