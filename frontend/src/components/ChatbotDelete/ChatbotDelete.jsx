
import { useRef, useState } from "react";
import config from "../../config/config.development";

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

const ChatbotDelete = ({ chatbot, handleCloseModal, onDeleteSuccess }) => {
    const [error, setError] = useState(null);
    const closeButtonRef = useRef(null);

    const deleteChatbot = () => {
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;

        fetch(`${config.backendUrl}/api/chatbots/delete/${chatbot.id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 204) {
                onDeleteSuccess(chatbot.id); // Notify parent component of successful deletion
                if (closeButtonRef.current) {
                    closeButtonRef.current.click(); // Trigger the close button's click event to close the modal
                }
            } else {
                return response.json().then(data => {
                    setError(data.error || 'Failed to delete chatbot.');
                });
            }
        })
        .catch(err => {
            setError('An error occurred. Please try again.');
            console.error('Error:', err);
        });
    };

    console.log('ViewChatbotDetails : ', chatbot);
    return (

        <div className="modal fade" id={`deleteChatbot`} tabIndex="-1" aria-labelledby="deleteChatbotLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-img-title">
                        <img 
                            alt="Chatbot avatar" 
                            className="avatar-sm rounded-circle me-3 modal-img" 
                            src={chatbot?.avatar ? `${config.backendUrl}${chatbot?.avatar}` : "default-chatbot-avatar.png"}
                        />
                        <h1 className="modal-title fs-5" id="deleteChatbotLabel">{chatbot?.name}</h1>
                    </div>
                    <button 
                        type="button"  
                        onClick={() => handleCloseModal()} 
                        className="btn-close" 
                        data-bs-dismiss="modal" 
                        aria-label="Close"
                        ref={closeButtonRef}
                        ></button>
                </div>
                <div className="modal-body">

                    Are you sure you want to delete this chatbot?
        
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={() => handleCloseModal()} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" onClick={deleteChatbot} className="btn btn-danger">Delete</button>
                </div>
                </div>
            </div>
        </div>

    )
}

export default ChatbotDelete;