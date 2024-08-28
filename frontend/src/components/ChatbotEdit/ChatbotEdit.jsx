import "./ChatbotDetails.css";
import config from "../../config/config.development";

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

const ChatbotDetails = ({ chatbot, handleCloseModal }) => {
    console.log('ViewChatbotDetails : ', chatbot);
    return (

        <div className="modal fade" id={`viewChatbot`} tabIndex="-1" aria-labelledby="viewChatbotLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-img-title">
                        <img 
                            alt="Chatbot avatar" 
                            className="avatar-sm rounded-circle me-3 modal-img" 
                            src={chatbot?.avatar ? `${config.backendUrl}${chatbot?.avatar}` : "default-chatbot-avatar.png"}
                        />
                        <h1 className="modal-title fs-5" id="viewChatbotLabel">{chatbot?.name}</h1>
                    </div>
                    <button type="button"  onClick={() => handleCloseModal()} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                    {/* <div className="tab-pane fade show active chatbot-overview" id="chatbot-details">
                        <h5 className="card-title">Chatbot Details</h5>
                        <p className="small fst-italic">
                            {chatbot?.description? chatbot?.description :
                                <span className="small fst-italic text-muted">No information provided</span>
                            }
                        </p>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 label">Chatbot name</div>
                            <div className="col-lg-9 col-md-8">
                                {chatbot?.name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 label">Website URL
                            </div>
                            <div className="col-lg-9 col-md-8">
                                {chatbot?.website_url}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 label">Created at</div>
                            <div className="col-lg-9 col-md-8">
                                {formatDate(chatbot?.created_at)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 label">Status</div>
                            <div className="col-lg-9 col-md-8">
                                {chatbot?.status}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 label">Training step</div>
                            <div className="col-lg-9 col-md-8">
                                {chatbot?.status == "training"? chatbot?.training_step :
                                    <span className="small fst-italic text-muted">Chatbot is not training now</span>
                                }
                            </div>
                        </div>

                    </div> */}
        
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={() => handleCloseModal()} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>

    )
}

export default ChatbotDetails;