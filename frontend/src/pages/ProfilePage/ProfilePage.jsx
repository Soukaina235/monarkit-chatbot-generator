
import { useEffect, useRef, useState } from 'react'
import ChangePassword from '../../components/ChangePassword/ChangePassword'
import ProfileEdit from '../../components/ProfileEdit/ProfileEdit'
import ProfileOverview from '../../components/ProfileOverview/ProfileOverview'
import './ProfilePage.css'

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const successRef = useRef(null);
    const errorRef = useRef(null);

    // Callback to handle success messages
    const handleSuccess = (message) => {
        setSuccess(message);
    };
    useEffect(() => {
        if (successRef.current) {
          const top = successRef.current.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: top - 100, // Adjust the value according to your navbar height
            behavior: 'smooth',
          });
        }
      }, [success]);


    // Callback to handle error messages
    const handleError = (message) => {
        setError(message);
    };
    useEffect(() => {
        if (errorRef.current) {
          const top = errorRef.current.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: top - 100, // Adjust the value according to your navbar height
            behavior: 'smooth',
          });
        }
      }, [error]);


    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access

        fetch('http://127.0.0.1:8000/api/profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        })
        .then(response => {
            console.log('Response:', response);
            return response.json();
          })
          .then(data => {
            console.log('Data:', data);
            setProfile(data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error:', error);
            setLoading(false);
          });
      }, []);

    function emptyAlerts() {
        setSuccess(null);
        setError(null);
    }

    if (!profile) return (
        <main className='loading'>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading...</p>
        </main>
    );

    return (
        <main>
            <section className="section profile">
                <div className="alerts">
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

                <div className="row">
                    <div className="col-xl-4">

                        <div className="card">
                            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                <img src="../../../public/default-company-2.png" alt="Profile" className="rounded-circle profile-image" />
                                <h2>{profile.company_name}</h2>
                                <h3>
                                    {profile.activity? profile.activity :
                                        <p className="small fst-italic text-muted">No information provided</p>
                                    }
                                </h3>
                            </div>
                        </div>

                    </div>  

                    <div className="col-xl-8">

                        <div className="card">
                            <div className="card-body pt-3">
                                <ul className="nav nav-tabs nav-tabs-bordered">
                                    <li className="nav-item">
                                        <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview" onClick={emptyAlerts}>Overview</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit" onClick={emptyAlerts}>Edit Profile</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password" onClick={emptyAlerts}>Change Password</button>
                                    </li>
                                </ul>

                                <div className="tab-content pt-2">
                                    <ProfileOverview profile={profile} />
                                    <ProfileEdit profile={profile} onSuccess={handleSuccess} onError={handleError} />
                                    <ChangePassword onSuccess={handleSuccess} onError={handleError} />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}
export default ProfilePage