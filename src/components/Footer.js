import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Contacto</h2>
            <p>RWDevelopment08@gmail.com</p>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              Las10últimas
            </Link>
          </div>
          <small className='website-rights'>Las10últimas © 2021</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
