import {Routes, Route} from 'react-router-dom';
import React, { Component }  from 'react';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';


const Shop = () => {
  return <h1>Hello I am shop page!</h1>
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Navigation/> } >
        <Route index={true} element={ <Home/> } />
        <Route path='shop' element={ <Shop/> } />
        <Route path='auth' element={ <Authentication/> } />
      </Route>
    </Routes>
  );
};

export default App;