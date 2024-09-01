import { useParams } from 'react-router-dom';
import './TrainingProcessPage.css';
import { useEffect, useState } from 'react';
import config from '../../config/config.development';

const TrainingProcessPage = () => {
    const { id } = useParams(); // Get the chatbot ID from the URL
    const [chatbot, setChatbot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [success, setSuccess] = useState(null);
    const [trainingStep, setTrainingStep] = useState(null);
    const [progress, setProgress] = useState(5);
    const [stepClasses, setStepClasses] = useState({'processing': '', 'extraction': '', 'augmentation': '', 'validation': '', 'training': ''});
    const [trainingStarted, setTrainingStarted] = useState(false);
    const [notStartedTraining, setNotStartedTraining] = useState(true);
    const [isTraining, setIsTraining] = useState(false);
    const [completedTraining, setCompletedTraining] = useState(false);

    const getProgressFromTrainingStep = (status) => {
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
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access

    
        fetch(`${config.backendUrl}/api/chatbots/training-step/${id}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            
        }) 
        .then(response => {
            console.log("response status", response);
            return response.json();
        })
        .then(data => {
            setTrainingStep(data.training_step)
            setProgress(getProgressFromTrainingStep(data.training_step));
            const steps = ['processing', 'extraction', 'augmentation', 'validation', 'training'];

            const getStepClass = (step) => {
                if (data.training_step === step) {
                    return 'completed';
                } 
                if (steps.indexOf(data.training_step) > steps.indexOf(step)) {
                    return 'completed';
                } else {
                    return '';
                }
            };
            
            setStepClasses({
                'processing': getStepClass('processing'),
                'extraction': getStepClass('extraction'),
                'augmentation': getStepClass('augmentation'),
                'validation': getStepClass('validation'),
                'training': getStepClass('training'),
            });

            if (data.training_step === null) {
                setNotStartedTraining(true);
                setIsTraining(false);
                setCompletedTraining(false);
            }
            if (data.training_step === 'completed') {
                setNotStartedTraining(false);
                setIsTraining(false);
                setCompletedTraining(true);
            }
            if (data.training_step !== null && data.training_step !== 'completed') {
                setNotStartedTraining(false);
                setIsTraining(true);
                setCompletedTraining(false);
            }

            console.log("training step", data);
            console.log("progress", progress);
            console.log("step classes", stepClasses);
        })
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const accessToken = JSON.parse(localStorage.getItem('authTokens')).access

        
            fetch(`${config.backendUrl}/api/chatbots/training-step/${id}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                
            }) 
            .then(response => {
                console.log("response status", response);
                return response.json();
            })
            .then(data => {
                setTrainingStep(data.training_step)
                setProgress(getProgressFromTrainingStep(data.training_step));
                const steps = ['processing', 'extraction', 'augmentation', 'validation', 'training'];

                const getStepClass = (step) => {
                    // if (trainingStep === step) {
                    //     return 'completed';
                    // } 
                    if (steps.indexOf(trainingStep) > steps.indexOf(step)) {
                        return 'completed';
                    } else {
                        return '';
                    }
                };
                
                setStepClasses({
                    'processing': getStepClass('processing'),
                    'extraction': getStepClass('extraction'),
                    'augmentation': getStepClass('augmentation'),
                    'validation': getStepClass('validation'),
                    'training': getStepClass('training'),
                });

                if (data.training_step === null) {
                    setNotStartedTraining(true);
                    setIsTraining(false);
                    setCompletedTraining(false);
                }
                if (data.training_step === 'completed') {
                    setNotStartedTraining(false);
                    setIsTraining(false);
                    setCompletedTraining(true);
                }
                if (data.training_step !== null && data.training_step !== 'completed') {
                    setNotStartedTraining(false);
                    setIsTraining(true);
                    setCompletedTraining(false);
                }

                console.log("training step", data);
                console.log("progress", progress);
                console.log("step classes", stepClasses);
            })
            .catch(err => console.error(err));
        }, 5000); // Poll every 5 seconds
    
        return () => clearInterval(interval); // Clear the interval when component unmounts
    }, [id]);

    const handleStartTraining = async () => {
        console.log('Starting training...');
        setTrainingStarted(true);
        setNotStartedTraining(false);
        setIsTraining(true);
        setCompletedTraining(false);
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
            setTrainingStarted(false);
        } catch (error) {
            console.error('Error:', error);
            setTrainingStarted(false);
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

    if (loading) return (
        <main className='loading'>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading...</p>
        </main>
    );
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
                                    src={chatbot.avatar ? `${baseUrl}${chatbot.avatar}` : "../../default-chatbot-avatar.png"}
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
                                {notStartedTraining &&
                                    <div>
                                        <div className="alert alert-warning" role="alert">
                                            ALERT: Your chatbot is not trained yet. Please start training.<br />
                                        </div>
                                        <button onClick={handleStartTraining} className="btn btn-primary start-training-button">
                                            Start Training
                                        </button>
                                    </div>
                                }
                                

                                {isTraining &&
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
                                                        {/*  ${stepClasses.processing} */}
                                                        <div className={`step`}> 
                                                            <div className="step-icon-wrap">
                                                                <div className="step-icon"><i className="bi bi-1-circle"></i></div>
                                                            </div>
                                                            <h4 className="step-title">Process Content</h4>
                                                        </div>

                                                        <div className={`step`}>
                                                            <div className="step-icon-wrap">
                                                                <div className="step-icon"><i className="bi bi-2-circle"></i></div>
                                                            </div>
                                                            <h4 className="step-title">Generate Data</h4>
                                                        </div>

                                                        <div className={`step`}>
                                                            <div className="step-icon-wrap">
                                                                <div className="step-icon"><i className="bi bi-3-circle"></i></div>
                                                            </div>
                                                            <h4 className="step-title">Augment Data</h4>
                                                        </div>

                                                        <div className={`step`}>
                                                            <div className="step-icon-wrap">
                                                                <div className="step-icon"><i className="bi bi-4-circle"></i></div>
                                                            </div>
                                                            <h4 className="step-title">Validate Data</h4>
                                                        </div>
                                                        
                                                        <div className={`step`}>
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

                                {completedTraining &&
                                    <div>
                                        <div className="alert alert-success" role="alert">
                                            ALERT: Your chatbot is trained and ready to use!
                                        </div>
                                    </div>
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