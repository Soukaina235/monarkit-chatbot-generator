import React from 'react'
import './Unauthorized.css';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
        <div className="container">

        <section className="section error-403 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>403</h1>
            <h2>You do not have permission to access this page.</h2>
            <Link to="/" className="btn">Back to home</Link>
            <img src="" className="img-fluid py-5" alt="Unauthorized" />
            <div className="credits">
                © 2024 Copyright Monarkit. All Rights Reserved
            </div>
        </section>

        </div>
    </div>
  )
}

export default PageNotFound