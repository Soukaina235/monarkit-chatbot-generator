import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import './Header.css';
import logo from '../../../public/logo.png'

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext);

  const [isMobileNavActive, setMobileNavActive] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const mobileNavToggle = () => {
    console.log("mobile nav toggle 1")
    setMobileNavActive(!isMobileNavActive);
    console.log("mobile nav toggle 2")
  };

  const toggleDropdown = (index) => {
    console.log("toggle dropdown 1")
    setActiveDropdown(activeDropdown === index ? null : index);
    console.log("toggle dropdown 2")
  };

  // const mobileNavShow = document.querySelector('.mobile-nav-show');
  // const mobileNavHide = document.querySelector('.mobile-nav-hide');

  // document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
  //   el.addEventListener('click', function(event) {
  //     event.preventDefault();
  //     mobileNavToggle();
  //   })
  // });

  // function mobileNavToggle() {
  //   document.querySelector('body').classList.toggle('mobile-nav-active');
  //   mobileNavShow.classList.toggle('d-none');
  //   mobileNavHide.classList.toggle('d-none');
  // }

  // const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  // navDropdowns.forEach(el => {
  //   el.addEventListener('click', function(event) {
  //     if (document.querySelector('.mobile-nav-active')) {
  //       event.preventDefault();
  //       this.classList.toggle('active');
  //       this.nextElementSibling.classList.toggle('dropdown-active');

  //       let dropDownIndicator = this.querySelector('.dropdown-indicator');
  //       dropDownIndicator.classList.toggle('bi-chevron-up');
  //       dropDownIndicator.classList.toggle('bi-chevron-down');
  //     }
  //   })
  // });


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
                <li><Link to="/">Home</Link></li>
                {user ? ( 
                  <li onClick={logoutUser}><a href='#'>Logout</a></li>
                ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
                )}
                <li><a href="team.html">Team</a></li>
                <li><a href="blog.html">Blog</a></li>

                {/* Main Dropdown */}
                <li className="dropdown">
                  <a href="#"
                    onClick={(e) => { e.preventDefault(); toggleDropdown(0); }}  
                  >
                    <span>Dropdown</span>             
                    <i className={`bi bi-chevron-down dropdown-indicator ${activeDropdown === 0 ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                  </a>
                  <ul className={activeDropdown === 0 ? 'dropdown-active' : ''}>
                    <li><a href="#">Dropdown 1</a></li>
                    <li className="dropdown"><a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down dropdown-indicator"></i></a>
                      <ul>
                        <li><a href="#">Deep Dropdown 1</a></li>
                        <li><a href="#">Deep Dropdown 2</a></li>
                        <li><a href="#">Deep Dropdown 3</a></li>
                        <li><a href="#">Deep Dropdown 4</a></li>
                        <li><a href="#">Deep Dropdown 5</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Dropdown 2</a></li>
                    <li><a href="#">Dropdown 3</a></li>
                    <li><a href="#">Dropdown 4</a></li>
                  </ul>
                </li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </nav>

          </div>
        </header>
    </div>
  )
}

export default Header
