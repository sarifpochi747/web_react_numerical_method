import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'
import { BrowserRouter,Routes ,Route,Link } from 'react-router-dom';

const Bar = ()=>{
  return (
    <Navbar bg="bal" expand="lg" >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">NUMERICAL METHOD</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>HOME</Nav.Link>
          </LinkContainer>
          {/* roots equations  */}
            <NavDropdown title="ROOTS OF EQUATIONS" id="basic-nav-dropdown">
              <LinkContainer to="/Bisection">
                <NavDropdown.Item href="#action/3.2">Bisection Method</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/FalsePosition">
                <NavDropdown.Item href="#action/3.3">False Position Method</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/OnePointInteraction">
                <NavDropdown.Item href="#action/3.4">One Point Interaction</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/NewtonRaphson">
                <NavDropdown.Item href="#action/3.5">Newton Raphson Method</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/Secant">
                <NavDropdown.Item href="#action/3.6">Secant Method</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          {/* Linear system  */}
            <NavDropdown title="LINEAR SYSTEM" id="basic-nav-dropdown">
              <LinkContainer to="/Cramer'srule">
                <NavDropdown.Item href="#action/3.7">Cramer's Rule</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/GaussJordan">
                <NavDropdown.Item href="#action/3.8">Gauss Jordan Method</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/LUDeacomposition">
                <NavDropdown.Item href="#action/3.9">LU Decomposition Method</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/Jacobi">
                <NavDropdown.Item href="#action/3.10">Jacobi</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/GaussSeidel">
                <NavDropdown.Item href="#action/3.11">Gauss Seidel Method</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          {/* Interpolation */}
            <NavDropdown title="INTERPOLATION" id="basic-nav-dropdown">
              <LinkContainer to="/Larange">
                <NavDropdown.Item href="#action/3.12">LarangInterpolation</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/LinearRegression">
                <NavDropdown.Item href="#action/3.12">LinearRegression</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/LinearRegressionAPI">
                <NavDropdown.Item href="#action/3.12">LinearRegressionAPI</NavDropdown.Item>
              </LinkContainer>
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Bar;