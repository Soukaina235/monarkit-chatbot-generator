import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';
import logo from '../../../public/logo.png';
import { Link } from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const successRef = useRef(null);
  const errorRef = useRef(null);
  useEffect(() => {
    if (successRef.current) {
      const top = successRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top - 100, // Adjust the value according to your navbar height
        behavior: 'smooth',
      });
    }
  }, [success]);
  
  useEffect(() => {
    if (errorRef.current) {
      const top = errorRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top - 100, // Adjust the value according to your navbar height
        behavior: 'smooth',
      });
    }
  }, [error]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username,
        email,
        password,
        date_of_birth: dateOfBirth
      });

      if (response.status === 201) {
        setSuccess('Registration successful! You can login to your account now.');
        setUsername('');
        setEmail('');
        setPassword(''); 
        setDateOfBirth('');
        setError('');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
  };


      

  return (
    <div>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">

              
              <div className="row justify-content-center">

              <div className="alerts col-lg-8 col-md-6">
                {success && 
                  <div 
                    ref={successRef} 
                    className="alert alert-success" 
                    role="alert"
                  >
                  {success}
                  </div>
                }

                {error && 
                  <div
                    ref={errorRef} 
                    className="alert alert-danger" 
                    role="alert"
                  >
                  {error}
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
                        <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                        <p className="text-center small">Enter your details to create an account</p>
                      </div>

                      <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="col-12">
                          <label htmlFor="name" className="form-label">Name</label>
                          <input type="text" name="name" className="form-control" id="name" required />
                          <div className="invalid-feedback">Please, enter your name!</div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input type="email" name="email" className="form-control" id="email" required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <div className="invalid-feedback">Please enter a valid Email address!</div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="username" className="form-label">Username</label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                            <input type="text" name="username" className="form-control" id="username" required
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                            <div className="invalid-feedback">Please choose a username.</div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">Password</label>
                          <input type="password" name="password" className="form-control" id="yourPassword" required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="invalid-feedback">Please enter your password!</div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                          <input type="date" name="dateOfBirth" className="form-control" id="dateOfBirth" required
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                          />
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required/>
                            <label className="form-check-label" htmlFor="acceptTerms">I agree and accept the <a href="#">terms and conditions</a></label>
                            <div className="invalid-feedback">You must agree before submitting.</div>
                          </div>
                        </div>

                        <div className="col-12">
                          <button className="register-button btn btn-primary w-100" type="submit">Create Account</button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">Already have an account? <Link to="/login">Login</Link></p>
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
};

export default Register;
