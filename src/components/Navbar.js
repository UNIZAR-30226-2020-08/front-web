/*Proyecto:     BibliUz
//Fecha:        noviembre-2020
//Autores:      Aarón Ibáñez Espés 779088, Pablo García García 781020, Arturo Calvera Tonin 776303
//Módulo:       Front-end del sistema de información del proyecto BibliUZ
//Fichero:      Navbar.js
//Descripción:  Componente Navbar usado a lo largo del front-end de Bibliuz como barra de navegación*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
          Las10últimas
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Inicio
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/protocolo'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Protocolo Covid
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/salas'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Salas de estudio
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
