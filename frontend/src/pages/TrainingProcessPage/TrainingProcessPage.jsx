import { useParams } from 'react-router-dom';
import './TrainingProcessPage.css';
import { useEffect, useState } from 'react';

const TrainingProcessPage = () => {
    const { id } = useParams(); // Get the chatbot ID from the URL
    const [chatbot, setChatbot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [trainingStatus, setTrainingStatus] = useState(null);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         fetch(`/api/chatbots/${id}/status/`)
    //             .then(response => response.json())
    //             .then(data => setTrainingStatus(data.status))
    //             .catch(err => console.error(err));
    //     }, 5000); // Poll every 5 seconds
    
    //     return () => clearInterval(interval); // Clear the interval when component unmounts
    // }, [id]);

    const handleStartTraining = async () => {
        console.log('Starting training...');
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/chatbots/start-training/${id}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                // Redirect to training page or show success message
                console.log('Training started successfully:', data);
            } else {
                // Handle error
                console.error('Failed to start training:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    

    useEffect(() => {
        console.log("from use effect", chatbot);
        const fetchChatbot = async () => {
            try {
                const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;
                const response = await fetch(`http://127.0.0.1:8000/api/chatbots/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch chatbot data');
                }
                const data = await response.json();
                setChatbot(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChatbot();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    console.log(chatbot);

    const baseUrl = "http://127.0.0.1:8000";

    return (
        <main>
            <section className="section chatbot-training">
                <div className="alerts">
                    {/* {success && 
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
                    } */}
                </div>

                <div className="row">
                    <div className="col-xl-4">

                        <div className="card">
                            <div className="card-body chatbot-card pt-4 d-flex flex-column align-items-center">
                                <img 
                                    src={chatbot.avatar ? `${baseUrl}${chatbot.avatar}` : "../../chatbot-avatar7.png"}
                                    alt="Chatbot" 
                                    className="rounded-circle chatbot-image" 
                                />
                                <h2>{chatbot.name}</h2>
                                <h3>
                                    {/* {profile.activity? profile.activity :
                                        <p className="small fst-italic text-muted">No information provided</p>
                                    } */}
                                </h3>
                            </div>
                        </div>

                    </div>  

                    <div className="col-xl-8">

                        <div className="card">
                            <div className="card-body pt-3 right-card">
                                <button onClick={handleStartTraining} className="px-2 text-primary"><i className="bi bi-gear-fill"></i></button>
    

                                <h3>Your chatbot is training...</h3>
                                <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: '75%' }}></div>
                                </div>
                                    

                                <div className="tab-content pt-2">
                                    ...
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}

export default TrainingProcessPage;