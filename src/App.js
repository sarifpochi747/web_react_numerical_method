import React from 'react';
import { BrowserRouter,Routes ,Route,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './Nav';
import Home from './Home';

// Root Of Equations
import Bisection from './RootEquation/Bisection';
import FalsePosition from './RootEquation/FalsePosition';
import OnePointInteraction from './RootEquation/OnepointInteraction';
import Newton from './RootEquation/NewtonRaphson';
import Secant from './RootEquation/Secant';

//linear  System
import Cramer from './LinearSystem/Cramer';
import GaussJordan from './LinearSystem/GaussJordan';
import Jacobi from './LinearSystem/Jacobi';
import GaussSeidel from './LinearSystem/GaussSeidel';


import LarangInterpolation from './Interpolation/LarangInterpolation';
import LinearRegression from './Interpolation/linearRegression';
import LinearRegressionAPI from './Interpolation/linearRegressionApi';
function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Bisection' element={<Bisection/>}></Route>
        <Route path='/FalsePosition' element={<FalsePosition/>}></Route>
        <Route path='/OnePointInteraction' element={<OnePointInteraction/>}></Route>
        <Route path='/NewtonRaphson' element={<Newton/>}></Route>
        <Route path='/Secant' element={<Secant/>}></Route>
        <Route path="/Cramer'srule" element={<Cramer/>}></Route>
        <Route path="/GaussJordan" element={<GaussJordan/>}></Route>
        <Route path="/Jacobi" element={<Jacobi/>}></Route>
        <Route path="/GaussSeidel" element={<GaussSeidel/>}></Route>
        <Route path="/Larange" element={<LarangInterpolation/>}></Route>
        <Route path="/LinearRegression" element={<LinearRegression/>}></Route>
        <Route path="/LinearRegressionAPI" element={<LinearRegressionAPI/>}></Route>
      </Routes>
    </div>
  );
}

export default App;