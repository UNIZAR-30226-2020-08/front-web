/*Proyecto:     BibliUz
//Fecha:        noviembre-2020
//Autores:      Aarón Ibáñez Espés 779088, Pablo García García 781020, Arturo Calvera Tonin 776303
//Módulo:       Front-end del sistema de información del proyecto BibliUZ
//Fichero:      Footer.js
//Descripción:  Componente Footer usado a lo largo del front-end de BibliUz como pie de página*/


import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Acerca de nosotros</h2>
            <Link to='/about'>Cómo funciona</Link>
            <Link to='/notImplemented'>Terminos de Servicio</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contacta con nosotros</h2>
            <p>Contacto</p>
            <p>info@bibliuz.com</p>
            <Link to='/notImplemented'>Soporte</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              NeoB
            </Link>
          </div>
          <small className='website-rights'>NeoB © 2020</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
