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
    const [progress, setProgress] = useState(5);
    const [stepClasses, setStepClasses] = useState({'processing': '', 'extraction': '', 'augmentation': '', 'validation': '', 'training': ''});

    const getProgressFromTrainingStatus = (status) => {
        switch (status) {
            case 'scraping':
                return 5;
            case 'processing':
                return 10;
            case 'extraction':
                return 25;
            case 'augmentation':
                return 40;
            case 'validation':
                return 45;
            case 'upload':
                return 50;
            case 'training':
                return 70;
            case 'completed':
                return 100;
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`/api/chatbots/${id}/status/`)
                .then(response => response.json())
                .then(data => {
                    setTrainingStatus(data.status)
                    setProgress(getProgressFromTrainingStatus(data.status));
                    setStepClasses({
                        'processing': data.status === 'extraction' ? 'completed' : '',
                        'extraction': data.status === 'augmentation' ? 'completed' : '',
                        'augmentation': data.status === 'validation' ? 'completed' : '',
                        'validation': data.status === 'upload' ? 'completed' : '',
                        'training': data.status === 'completed' ? 'completed' : ''
                    });
                })
                .catch(err => console.error(err));
        }, 5000); // Poll every 5 seconds
    
        return () => clearInterval(interval); // Clear the interval when component unmounts
    }, [id]);

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
                            </div>
                        </div>

                    </div>  

                    <div className="col-xl-8">

                        <div className="card">
                            <div className="card-body pt-3 right-card">
                                {chatbot.status === 'initialized' &&
                                    <div>
                                        <div className="alert alert-warning" role="alert">
                                            ALERT: Your chatbot is not trained yet. Please start training.<br />
                                            Once the training has started it cannot be stopped.
                                        </div>
                                        <button onClick={handleStartTraining} className="btn btn-primary start-training-button">
                                            Start Training
                                        </button>
                                    </div>
                                }
                                

                                {chatbot.status === 'training' &&
                                    <>
                                        <div className="alert alert-info" role="alert">
                                            Your chatbot is training...
                                        </div>
                                        
                                        <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: `${progress}%` }}></div>
                                        </div>


                                        <div className="progress-steps">
                                            <div className="mb-3">
                                                <div className="card-body">
                                                    <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                                                        <div className={`step ${setStepClasses}`}>
                                                            <div className="step-icon-wrap">
                                                                <div className="step-icon"><i className="bi bi-1-circle"></i></div>
                                                            </div>
                                                            <h4 className="step-title">Process Content</h4>
                                                        </div>

                                                        <div className={`step ${setStepClasses}`}>
                                                            <div className="step-icon-wrap">
                                                                <div className="step-icon"><i className="bi bi-2-circle"></i></div>
                                                            </div>
                                                            <h4 className="step-title">Generate Data</h4>
                                                        </div>

                                                        <div className="step">
                                                            <div className="step-icon-wrap">
                                                                <div className="step-icon"><i className="bi bi-3-circle"></i></div>
                                                            </div>
                                                            <h4 className="step-title">Augment Data</h4>
                                                        </div>

                                                        <div className="step">
                                                            <div className="step-icon-wrap">
                                                                <div className="step-icon"><i className="bi bi-4-circle"></i></div>
                                                            </div>
                                                            <h4 className="step-title">Validate Data</h4>
                                                        </div>
                                                        
                                                        <div className="step">
                                                            <div className="step-icon-wrap">
                                                                <div className="step-icon"><i className="bi bi-5-circle"></i></div>
                                                            </div>
                                                            <h4 className="step-title">Train Model</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>

                                        </div>
                                    </>
                                }
                                
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}

export default TrainingProcessPage;