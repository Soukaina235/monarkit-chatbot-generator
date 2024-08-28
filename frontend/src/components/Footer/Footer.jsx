import React from 'react'
import './Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer id="footer" className="footer">
          <div className="footer-content">
            <div className="container">
              <div className="row gy-4">
                <div className="col-lg-4 col-md-8 footer-info">
                  <a href="index.html" className="logo d-flex align-items-center">
                  <span>Aionchat</span>
                  </a>
                  <p>Designed and built by Monarkit.</p>
                  <div className="social-links d-flex  mt-3">
                    <Link target='_blank' to="https://www.youtube.com/@Monarkit" className="youtube"><i className="bi bi-youtube"></i></Link>
                    <Link target='_blank' to="https://www.facebook.com/Monarkit.net" className="facebook"><i className="bi bi-facebook"></i></Link>
                    <Link target='_blank' to="https://www.instagram.com/monarkit_net/" className="instagram"><i className="bi bi-instagram"></i></Link>
                    <Link target='_blank' to="https://www.linkedin.com/company/monarkit/mycompany/verification/" className="linkedin"><i className="bi bi-linkedin"></i></Link>
                  </div>
                </div>

                <div className="col-lg-2 col-4 footer-links">
                  <h4>Useful Links</h4>
                  <ul>
                    <li><i className="bi bi-dash"></i> <a href="#">Home</a></li>
                  </ul>
                </div>

                <div className="col-lg-3 col-4 footer-links">
                  <h4>Our Services</h4>
                  <ul>
                    <li><i className="bi bi-dash"></i> <a href="#">Web Development</a></li>
                    <li><i className="bi bi-dash"></i> <a href="#">Mobile Development</a></li>
                  </ul>
                </div>

                <div className="col-lg-2 col-8 footer-contact text-center text-md-start">
                  <h4>Contact Us</h4>
                  <p>
                    Centre d'affaire Bergis, <br />
                    5ème étage Bureau 18, Avenue SAFI - Marrakech<br />
                    Morocco <br /><br />
                    <strong>Phone:</strong> +(212) 808503103<br />
                    <strong>Email:</strong> contact@aionchat.net<br />
                  </p>
                </div>

              </div>
            </div>

            <div className="footer-legal">
              <div className="container">
                  <div className="copyright">
                    &copy; Copyright <strong><span>Monarkit</span></strong>. All Rights Reserved
                  </div>
              </div>
            </div>
            
            </div>
        </footer>
    </div>
  )
}


export default Footer