import React, { useState, useRef } from 'react';
import { Navbar, Nav, NavDropdown, Container, Breadcrumb, Row, Col, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import DriversComponent from './Components/drivers';
import CompanyComponents from './Components/company';
import VehicleComponent from './Components/vehicle';
import "./App.css"
import Home from './Components/otros/home';
function App() {
  const [activeTab, setactiveTab] = useState(0);
  const components = {
    0: <Home />,
    1: <CompanyComponents />,
    2: <DriversComponent />,
    3: <VehicleComponent />,
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#" onClick={() => {
                setactiveTab(0);
              }}>TransportistasDev</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#" onClick={() => {
                    setactiveTab(1);
                  }}>Compañias</Nav.Link>
                  <Nav.Link href="#" onClick={() => {
                    setactiveTab(2);
                  }}>Conductores</Nav.Link>
                  <Nav.Link href="#" onClick={() => {
                    setactiveTab(3);
                  }}>Vehiculos</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Row>
            <Col md="12">
              <Card>
                <Card.Body>
                  {components[activeTab]}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default App;
