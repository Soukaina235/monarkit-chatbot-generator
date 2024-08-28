import React, {useContext, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import './Header.css';
import logo from '../../../public/logo.png'

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext);

  const [isMobileNavActive, setMobileNavActive] = useState(false);

  const mobileNavToggle = () => {
    setMobileNavActive(!isMobileNavActive);
  };

  /* For header scrolling */
  useEffect(() => {
    const header = document.querySelector('.header');

    function checkScroll() {
      if (window.scrollY > 0) {
        header.classList.add('sticked');
      } else {
        header.classList.remove('sticked');
      }
    }

    window.addEventListener('scroll', checkScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
    <div>
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

          <div href="#" className="nav-logo d-flex align-items-center">     
            <img src={logo} alt="" />   
            <h1>AionChat</h1>
          </div>

          {/* For dropdown icon */}
          <i
            className={`mobile-nav-toggle mobile-nav-show bi bi-list ${isMobileNavActive ? 'd-none' : ''}`}
            onClick={mobileNavToggle}
          ></i>
          <i
            className={`mobile-nav-toggle mobile-nav-hide bi bi-x ${!isMobileNavActive ? 'd-none' : ''}`}
            onClick={mobileNavToggle}
          ></i>

          {/* Navbar */}
          <nav id="navbar" className={`navbar ${isMobileNavActive ? 'mobile-nav-active' : ''}`}>
            <ul>
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>Home</NavLink>
              </li>
              {user ? (
                <> 
                  <li>
                    <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : undefined)}>Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/chatbots" className={({ isActive }) => (isActive ? "active" : undefined)}>My Chatbots</NavLink>
                  </li>
                  <li onClick={logoutUser}>
                    <a href='#'>Logout</a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : undefined)}>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : undefined)}>Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>

        </div>
      </header>
    </div>
  );
}

export default Header;
