import React, { useState, useEffect, useRef } from 'react';
import './ProfileEdit.css';
import config from '../../config/config.development';

const ProfileEdit = ({ profile, setProfile, onSuccess, onError }) => {
    const [formData, setFormData] = useState({
        email: profile.email,
        company_name: profile.company_name,
        activity: profile.activity,
        about: profile.about,
        country: profile.country,
        address: profile.address,
        phone: profile.phone,
        profile_image: profile.profile_image, 
    });
    const [profileImageChanged, setProfileImageChanged] = useState(false);

    useEffect(() => {
        setFormData({
            email: profile.email,
            company_name: profile.company_name,
            activity: profile.activity,
            about: profile.about,
            country: profile.country,
            address: profile.address,
            phone: profile.phone,
            profile_image: profile.profile_image,  
        });
    }, [profile]);

    const getImageToDisplay = () => {
        if (profileImageChanged) {
            console.log('profile_image from url.createObjectUrl: ', formData.profile_image);
            return URL.createObjectURL(formData.profile_image);
        } else if (formData.profile_image && !profileImageChanged) {
            // Base URL of the backend
            // const baseUrl = 'http://127.0.0.1:8000';
            return `${config.backendUrl}${formData.profile_image}`;
        } else {
            return "default-company-avatar.png";
        }
    }

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({ 
            ...prev, 
            [name]: files ? files[0] : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ 
                ...prev, 
                profile_image: file,
            }));
            setProfileImageChanged(true);
        }
    };

    const handleRemoveImage = () => {
        // Logic to remove image
        setFormData((prev) => ({ 
            ...prev, 
            profile_image: null,
        }));
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access

        e.preventDefault();

        console.log('From handleSubmit formData.profile_image :', formData.profile_image);
        const formDataObj = new FormData();
        for (let key in formData) {
            if (formData[key]) {
                if (key === 'profile_image' && !profileImageChanged) {
                    continue;
                }    
                formDataObj.append(key, formData[key]);
            }
        }

        try {
            // When sending FormData, you should not manually set the Content-Type header because the browser will set it automatically to multipart/form-data and include the appropriate boundary. 
            const response = await fetch(`${config.backendUrl}/api/profile/update/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: formDataObj,
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Profile updated successfully:', data);
                onSuccess('Profile updated successfully!');
                setProfile(data);
                setProfileImageChanged(false);
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
                    <img 
                        id="profile_image" 
                        className="profile-image" 
                        src={getImageToDisplay()}
                        alt="Profile" 
                    />
                    <div className="pt-2">
                        <input 
                            type="file" 
                            id="profile_image" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            accept="image/*" 
                            onChange={handleFileChange} 
                        />
                        <a 
                            href="#" 
                            className="btn btn-primary btn-sm" 
                            title="Upload new profile image"
                            onClick={handleUploadClick}
                        >
                            <i className="bi bi-upload"></i>
                        </a>
                        <a 
                            href="#" 
                            className="btn btn-danger btn-sm" 
                            title="Remove profile image"
                            onClick={handleRemoveImage}
                        >
                            <i className="bi bi-trash"></i>
                        </a>
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

export default ProfileEdit;