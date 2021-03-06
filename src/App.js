/*Proyecto:     Las10últimas
//Fecha:        marzo-2021
//Autor:        WBDevelopment
//Módulo:       Front-end del sistema Las10últimas
//Fichero:      App.js
//Descripción:  Archivo para el arranque del servidor de Front-end*/

import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import Game from './components/pages/Game';
import SignUp from './components/pages/SignUp';
import Profile from './components/pages/Profile';
import EditProfile from './components/pages/EditProfile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/inicio' exact component={Game} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/editprofile' exact component={EditProfile} />
        </Switch>
        <Footer />
      </Router>
  );
}

export default App;
