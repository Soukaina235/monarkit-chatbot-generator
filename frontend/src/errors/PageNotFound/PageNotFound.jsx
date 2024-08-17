import React from 'react'
import './PageNotFound.css';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
        <div className="container">

        <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>404</h1>
            <h2>The page you are looking for doesn't exist.</h2>
            <Link to="/" className="btn">Back to home</Link>
            <img src="../../../public/not-found2.jpg" className="img-fluid py-5" alt="Page Not Found" />
            <div className="credits">
                © 2024 Copyright Monarkit. All Rights Reserved
            </div>
        </section>

        </div>
    </div>
  )
}

export default PageNotFound