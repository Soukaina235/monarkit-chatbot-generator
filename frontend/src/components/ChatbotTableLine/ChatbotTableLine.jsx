import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

const ChatbotTableLine = ({chatbot, onOpenModal}) => {

    console.log(chatbot);
    // Base URL of the backend
    const baseUrl = 'http://127.0.0.1:8000';

    const getStatusClass = (status) => {
        switch (status) {
            case 'initialized':
                return 'success text-white'; // soft-success
            case 'trained':
                return 'primary text-white';
            case 'failed':
                return 'danger text-white';
            case 'cancelled':
                return 'secondary text-white';
            case 'training':
                return 'warning text-dark';
            default:
                return 'light text-dark'; // Default class for unknown status
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'initialized':
                return 'Initialized';
            case 'trained':
                return 'Trained';
            case 'failed':
                return 'Failed';
            case 'cancelled':
                return 'Cancelled';
            case 'training':
                return 'Training';
            default:
                return 'Unknown'; // Default text for unknown status
        }
    }

    const handleStartTraining = async () => {}

    return (
        <tr>
            <th scope="row" className="ps-4">
                <div className="form-check font-size-16"><input type="checkbox" className="form-check-input" id="contacusercheck1" /><label className="form-check-label" htmlFor="contacusercheck1"></label></div>
            </th>
            <td>
                <img 
                alt="Chatbot avatar" 
                className="avatar-sm rounded-circle me-2" 
                src={chatbot.avatar ? `${baseUrl}${chatbot.avatar}` : "chatbot-avatar7.png"}
            />
            </td>
            <td>{chatbot.name}</td>
            {/* <td>
                {chatbot.description ? 
                    chatbot.description : 
                    <span className="small fst-italic text-muted">Not provided</span>
                }
            </td> */}
            <td>{formatDate(chatbot.createdAt)}</td>
            <td><span className={`badge text-bg-${getStatusClass(chatbot.status)} chatbot-status`}>{getStatusText(chatbot.status)}</span></td>
            <td>
                <ul className="list-inline mb-0">
                    {chatbot.status === 'initialized' ? 
                        (
                            <li className="list-inline-item">
                                <Link to={`/training/${chatbot.id}`} onClick={handleStartTraining} className="px-2 text-success"><i className="bi bi-gear-fill"></i></Link>
                            </li>
                        ) :
                        (
                            <li className="list-inline-item">
                                <Link to={"#"} title="Train" className="px-2 text-secondary training-inactive"><i className="bi bi-gear-fill"></i></Link>
                            </li>
                        )
                    }
                    <li className="list-inline-item">
                        <span onClick={() => onOpenModal(chatbot)} className="modal-button" type="button" data-bs-toggle="modal" data-bs-target="#editChatbot">
                            <span title="Edit" className="px-1 text-primary"><i className="bi bi-pencil"></i></span>
                        </span>
                    </li>

                    <li className="list-inline-item">
                        <span onClick={() => onOpenModal(chatbot)} className="modal-button" type="button" data-bs-toggle="modal" data-bs-target={`#viewChatbot`}>
                            <span title="View" className="px-1 text-info"><i className="bi bi-eye-fill"></i></span>
                        </span>
                    </li>
                    
                    <li className="list-inline-item">
                        <span onClick={() => onOpenModal(chatbot)} className="modal-button" type="button" data-bs-toggle="modal" data-bs-target="#deleteChatbot">
                            <span title="Delete" className="px-1 text-danger"><i className="bi bi-trash3"></i></span>
                        </span>
                    </li>
                </ul>
            </td>
        </tr>



        // <tr data-index="0">
        //     <td scope="row">
        //         <img
        //             src={chatbot.avatar ? `${baseUrl}${chatbot.avatar}` : "chatbot-avatar7.png"}
        //             alt="Profile" 
        //             className="rounded-circle avatar-image" 
        //             width="50px"
        //             height="50px"
        //         />
        //     </td>
        //     <td>{chatbot.name}</td>
        //     <td>{chatbot.description ? 
        //             chatbot.description : 
        //             <span className="small fst-italic text-muted">Not provided</span>
        //         }
        //     </td>
        //     <td>{formatDate(chatbot.createdAt)}</td>
        //     <td className="green">
        //         <span className={`badge bg-${getStatusClass(chatbot.status)} chatbot-status`}>{getStatusText(chatbot.status)}</span>
        //     </td>
        //     {/* /chatbot/train/${chatbot.id} */}
        //     <td>
        //         <Link to={`#`} className="btn btn-primary btn-sm">Train</Link>
        //     </td>
        // </tr>
    );
}

export default ChatbotTableLine;