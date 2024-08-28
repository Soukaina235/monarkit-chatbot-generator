import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';
// import logo from '../../../public/logo.png';
import { Link } from 'react-router-dom';
import config from '../../config/config.development';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [activity, setActivity] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');

  const [loading, setLoading] = useState(false);  
  
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
    setLoading(true);
    try {
      const response = await axios.post(`${config.backendUrl}/api/register/`, {
        email,
        password,
        company_name: companyName,
        activity,
        country,
        address,
        phone,
        about
      });

      if (response.status === 201) {
        setSuccess('Registration successful! You can login to your account now.');
        setEmail('');
        setPassword(''); 
        setCompanyName('');
        setActivity('');
        setCountry('');
        setAddress('');
        setPhone('');
        setAbout('');
        setError('');
        setLoading(false);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      setSuccess('');
      setLoading(false);
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
                        <p className="text-center small">Enter your company's details to create an account</p>
                      </div>

                      <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="col-12">
                          <label htmlFor="companyName" className="form-label">Company name *</label>
                          <input type="text" name="companyName" className="form-control" id="companyName" required 
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                          />
                          <div className="invalid-feedback">Please, enter your company name!</div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="email" className="form-label">Email *</label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                            <input type="email" name="email" className="form-control" id="email" required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="invalid-feedback">Please  enter a valid Email address!</div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="activity" className="form-label">Activity *</label>
                          <input type="text" name="activity" className="form-control" id="activity" required
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                          />
                        </div>

                        <div className="col-12">
                          <label htmlFor="country" className="form-label">Country</label>
                          <input type="text" name="country" className="form-control" id="country" required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>

                        <div className="col-12">
                          <label htmlFor="address" className="form-label">Address</label>
                          <input type="text" name="address" className="form-control" id="address" required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>

                        <div className="col-12">
                          <label htmlFor="phone" className="form-label">Phone number *</label>
                          <input type="text" name="phone" className="form-control" id="phone" required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          <div className="invalid-feedback">Please enter your company's phone number!</div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="about" className="form-label">About</label>
                          <textarea name="about" className="form-control" id="about" required
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                          ></textarea>
                        </div>

                        <div className="col-12">
                          <label htmlFor="password" className="form-label">Password *</label>
                          <input type="password" name="password" className="form-control" id="password" required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="invalid-feedback">Please enter a password!</div>
                        </div>


                        <div className="col-12">
                          <div className="form-check">
                            <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required/>
                            <label className="form-check-label" htmlFor="acceptTerms">I agree and accept the <a href="#">terms and conditions</a></label>
                            <div className="invalid-feedback">You must agree before submitting.</div>
                          </div>
                        </div>

                        <div className="col-12">
                          <button className="login-button btn btn-primary w-100" type="submit" disabled={loading}>
                            {loading && <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>}
                            <span>Create Account</span>
                          </button>
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
