import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthenticationDataService from "../services/auth.service";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const user = AuthenticationDataService.getCurrentUser();

  const handleLogOut = () => {
    AuthenticationDataService.logout();
  }

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
          Las10últimas
          </Link>
          { user ?
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          :
          <div>
          </div>
          }
          { user ?
           <ul className={click ? 'nav-menu active' : 'nav-menu'}> 
           <li className='nav-item'>
              <Link
                to='/profile'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                {user.data.username + "🏆" + user.data.copas}
              </Link>
            </li>
            <li>
            <Link
            to='/'
            className='nav-links-mobile'
            onClick={handleLogOut}
            >
              Cerrar Sesión
            </Link>
            </li>
            </ul>
            :
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
            </li>
            </ul>
          }
          
          { user ?
          <div>
          {button && <Button buttonStyle='btn--outline' path='/' onClick={handleLogOut}>Cerrar Sesión</Button>}
          </div>
          :
          <div>
          </div>
          }
        </div>
      </nav>
    </>
  );
}

export default Navbar;
