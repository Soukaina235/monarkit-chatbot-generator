import React, { useState, useEffect } from 'react';
import './ProfileEdit.css';

const ProfileEditForm = ({ profile, onSuccess, onError }) => {
    const [formData, setFormData] = useState({
        email: profile.email,
        company_name: profile.company_name,
        activity: profile.activity,
        about: profile.about,
        country: profile.country,
        address: profile.address,
        phone: profile.phone,
    });

    useEffect(() => {
        setFormData({
            email: profile.email,
            company_name: profile.company_name,
            activity: profile.activity,
            about: profile.about,
            country: profile.country,
            address: profile.address,
            phone: profile.phone,
        });
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access

        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/profile/update/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Profile updated successfully:', data);
                onSuccess('Profile updated successfully!');
            } else {
                console.error('Error updating profile:', data);
                onError(data.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
            onError('An unexpected error occurred');
        }
    };

    return(
        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                <label htmlFor="profile_image" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                <div className="col-md-8 col-lg-9">
                    <img id="profile_image" className="profile-image" src="../../../public/default-company-2.png" alt="Profile" />
                    <div className="pt-2">
                    <a href="#" className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"></i></a>
                    <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash"></i></a>
                    </div>
                </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="company_name" className="col-md-4 col-lg-3 col-form-label">Company name</label>
                    <div className="col-md-8 col-lg-9">
                        <input 
                            name="company_name" 
                            type="text" 
                            className="form-control" 
                            id="company_name" 
                            value={formData.company_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                    <div className="col-md-8 col-lg-9">
                        <textarea 
                            name="about" 
                            className="form-control" 
                            id="about"
                            value={formData.about}
                            onChange={handleChange}
                        >
                        </textarea> 
                    </div>
                </div>
                
                <div className="row mb-3">
                    <label htmlFor="activity" className="col-md-4 col-lg-3 col-form-label">Activity</label>
                    <div className="col-md-8 col-lg-9">
                        <input 
                            name="activity" 
                            type="text" 
                            className="form-control" 
                            id="activity" 
                            value={formData.activity}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="country" className="col-md-4 col-lg-3 col-form-label">Country</label>
                    <div className="col-md-8 col-lg-9">
                        <input 
                            name="country" 
                            type="text" 
                            className="form-control" 
                            id="country" 
                            value={formData.country}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                    <div className="col-md-8 col-lg-9">
                        <input 
                            name="address" 
                            type="text" 
                            className="form-control" 
                            id="address" 
                            value={formData.address}
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="phone" type="text" className="form-control bg-light" id="phone" readOnly value={formData.phone} />
                        <small className="form-text text-muted">
                            Phone number cannot be changed.
                        </small>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="email" type="email" className="form-control bg-light" id="email" readOnly value={formData.email} />
                        <small className="form-text text-muted">
                            Email cannot be changed.
                        </small>
                    </div>
                </div>

                <div className="text-center">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >Save Changes</button>
                </div>
            </form>

        </div>

    )
}

export default ProfileEditForm;