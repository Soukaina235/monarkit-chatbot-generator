import React, {useContext, useEffect, useRef, useState} from 'react'
import AuthContext from '../../context/AuthContext';
import './LoginPage.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext);

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = await loginUser(e);
    if (errorMessage) {
      setError(errorMessage);
    }
  };

  const errorRef = useRef(null);
  
  useEffect(() => {
    if (errorRef.current) {
      const top = errorRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top - 100, // Adjust the value according to navbar height
        behavior: 'smooth',
      });
    }
  }, [error]);

  return (

    <div>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">

                <div className="alerts col-lg-8 col-md-6">
                  {error && 
                    <div
                      ref={errorRef} 
                      className="alert alert-danger" 
                      role="alert"
                    >
                      Login credentials are incorrect. Please try again.
                    </div>
                  }
                </div>

                <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">

                  <div className="d-flex justify-content-center py-4">
                    <a href="#" className="logo d-flex align-items-center w-auto">
                      {/* <img src="assets/img/logo.png" alt="" /> */}
                      <span className="d-none d-lg-block">AionChat</span>
                    </a>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">

                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                        <p className="text-center small">Enter your email & password to login</p>
                      </div>

                      <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>

                        <div className="col-12">
                          <label htmlFor="email" className="form-label">Email</label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                            <input type="text" name="email" className="form-control" id="email" required/>
                            <div className="invalid-feedback">Please enter your email.</div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input type="password" name="password" className="form-control" id="password" required/>
                          <div className="invalid-feedback">Please enter your password!</div>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe"/>
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <button className="login-button btn btn-primary w-100" type="submit">Login</button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">Don't have account? <Link to="/register">Create an account</Link></p>
                        </div>
                      </form>

                    </div>
                  </div>

                  <div className="credits">
                    © 2024 Copyright Monarkit. All Rights Reserved
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
