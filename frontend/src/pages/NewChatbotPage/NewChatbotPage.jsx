import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './NewChatbotPage.css';
import { jwtDecode } from 'jwt-decode';

const NewChatbotPage = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  
    const successRef = useRef(null);
    const errorRef = useRef(null);
    
    const [formData, setFormData] = useState({
        name: '',
        website_url: '',
        avatar: null,
        description: '',
        status: 'initialized',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({ 
            ...prev, 
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access

        e.preventDefault();

        console.log("from handle submit form data", formData);

        const formDataObj = new FormData();
        for (let key in formData) {
            if (formData[key]) {
                formDataObj.append(key, formData[key]);
            }
        }

        const userId = jwtDecode(accessToken).user_id;
        formDataObj.append('user_id', userId);
        console.log("from handle submit user if", userId);
        
        console.log("from handle submit form data obj", formDataObj);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/chatbot/create/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: formDataObj,
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Chatbot initialized successfully:', data);
                setSuccess('Chatbot initialized successfully!');
            } else {
                console.error('Error initializing chatbot:', data);
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    };
    
    return(
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
                            <h5 className="card-title text-center pb-0 fs-4">Initialize a new Chatbot</h5>
                            <p className="text-center small">Customize your chatbot by enter the following details.</p>
                        </div>

                        <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label htmlFor="name" className="form-label">Chatbot Name *</label>
                                <input type="text" name="name" className="form-control" id="name" required 
                                    // value={formData.name}
                                    onChange={handleChange}
                                />
                                <div className="invalid-feedback">Please, enter your chatbot name!</div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="website_url" className="form-label">Website URL *</label>
                                <input type="text" name="website_url" className="form-control" id="website_url" required
                                    // value={formData.website_url}
                                    onChange={handleChange}
                                />
                                <div className="invalid-feedback">Please, enter your website URL!</div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="avatar" className="form-label">Chatbot Avatar</label>
                                <input className="form-control" type="file" id="avatar" name="avatar" 
                                    // value={formData.avatar}
                                    accept='image/*'
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-12">
                                <label htmlFor="website_url" className="form-label">Description</label>
                                <textarea 
                                    name="description" 
                                    className="form-control" 
                                    id="description"
                                    // value={formData.description}
                                    onChange={handleChange}
                                >
                                </textarea>
                            </div>

                            

                            <div className="col-12">
                                <button className="submit-button btn btn-primary w-100" type="submit">Initialize Chatbot</button>
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
    )
};

export default NewChatbotPage;