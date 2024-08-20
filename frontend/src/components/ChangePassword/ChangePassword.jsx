import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const ChangePassword = ({ onSuccess, onError }) => {
    
  let {logoutUser} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        renew_password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { current_password, new_password, renew_password } = formData;
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access

        if (new_password !== renew_password) {
            onError('New passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/change-password/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // Replace with your actual token
                },
                body: JSON.stringify({
                    old_password: current_password,
                    new_password: new_password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                onSuccess(data.message || 'Password changed successfully!');
                logoutUser();
            } else {
                onError(data.error || 'An error occurred');
            }
        } catch (error) {
            onError('An unexpected error occurred');
        }
    };

    return (
        <div className="tab-pane fade pt-3" id="profile-change-password">
            <form onSubmit={handleSubmit}>

                <div 
                    className="alert alert-info" 
                    role="alert"
                >
                    ALERT! When your password is changed successfully, you will be logged out.
                </div>

                <div className="row mb-3">
                <label htmlFor="current_password" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                <div className="col-md-8 col-lg-9">
                    <input 
                        name="current_password" 
                        type="password" 
                        className="form-control" 
                        id="current_password" 
                        value={formData.current_password}
                        onChange={handleChange}
                        required
                    />
                </div>
                </div>

                <div className="row mb-3">
                <label htmlFor="new_password" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                <div className="col-md-8 col-lg-9">
                    <input 
                        name="new_password" 
                        type="password" 
                        className="form-control" 
                        id="new_password" 
                        value={formData.new_password}
                        onChange={handleChange}
                        required
                    />
                </div>
                </div>

                <div className="row mb-3">
                <label htmlFor="renew_password" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                <div className="col-md-8 col-lg-9">
                    <input 
                            name="renew_password" 
                            type="password" 
                            className="form-control"
                            id="renew_password" 
                            value={formData.renew_password}
                            onChange={handleChange}
                            required
                    />
                </div>
                </div>

                <div className="text-center">
                <button type="submit" className="btn btn-primary">Change Password</button>
                </div>
            </form>

            </div>
    )
}

export default ChangePassword;