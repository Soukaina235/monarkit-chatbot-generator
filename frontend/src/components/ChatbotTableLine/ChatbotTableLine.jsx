import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ChatbotTableLine.css';
import { getCompanyNameFromToken } from '../../utils/TokenUtils';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

const ChatbotTableLine = ({chatbot, onOpenModal}) => {
    const [copySuccess, setCopySuccess] = useState('');

    const copyCode = (chatbot) => {
        const accessToken = JSON.parse(localStorage.getItem('authTokens')).access
        const companyName = getCompanyNameFromToken(accessToken);
        const chatbotId = chatbot.id;
        const code = `
            <script>
                (function() {
                    const rootContainer = document.createElement('div');
                    const widgetContainer = document.createElement('div');
                    widgetContainer.id = 'chatbot-widget';
                    widgetContainer.style.position = 'fixed';
                    widgetContainer.style.bottom = '20px';
                    widgetContainer.style.right = '20px';
                    widgetContainer.style.width = '400px';
                    widgetContainer.style.height = '600px';
                    widgetContainer.style.backgroundColor = '#ffffff';
                    widgetContainer.style.border = '1px solid #ccc';
                    widgetContainer.style.borderRadius = '10px';
                    widgetContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
                    widgetContainer.style.zIndex = '9998';
                    widgetContainer.style.display = 'none'; // Initially hidden
                
                    const toggleButton = document.createElement('button');
                    toggleButton.style.position = 'absolute';
                    toggleButton.style.bottom = '20px';
                    toggleButton.style.right = '20px';
                    toggleButton.style.padding = '12px 15px';
                    toggleButton.style.backgroundColor = '#1087FF';
                    toggleButton.style.color = '#fff';
                    toggleButton.style.border = 'none';
                    toggleButton.style.borderRadius = '5px';
                    toggleButton.style.padding = '10px';
                    toggleButton.style.cursor = 'pointer';
                    toggleButton.style.display = 'block';
                    toggleButton.style.zIndex = '9999';
                    toggleButton.style.fontSize = '20px';
                    toggleButton.style.borderRadius = '30px';
                    toggleButton.style.transition = 'all 0.3s ease';

                    toggleButton.onclick = () => {
                        widgetContainer.style.display = widgetContainer.style.display === 'none' ? 'block' : 'none';
                    };

                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css';
                    document.head.appendChild(link);

                    const icon = document.createElement('i');
                    icon.className = 'bi bi-robot'; // Replace with desired icon class
                    toggleButton.appendChild(icon);
                
                    rootContainer.appendChild(toggleButton);
                    rootContainer.appendChild(widgetContainer);
                
                    const iframe = document.createElement('iframe');
                    iframe.src = 'http://localhost:5173/widget/${companyName}/${chatbotId}';
                    iframe.style.width = '100%';
                    iframe.style.height = '100%';
                    iframe.style.border = 'none';
                
                    widgetContainer.appendChild(iframe);
                
                    document.body.appendChild(rootContainer);
                })();
            </script>
        `;
        navigator.clipboard.writeText(code)
            .then(() => {
                setCopySuccess('Code copied to clipboard!');                
                setTimeout(() => setCopySuccess(''), 3000); // Hide message after 3 seconds
            })
            .catch(err => {
                console.error('Failed to copy code:', err);
                // Optionally, handle the error case
            });
    }


    // console.log(chatbot);
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
                src={chatbot.avatar ? `${baseUrl}${chatbot.avatar}` : "default-chatbot-avatar.png"}
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
                    {/* <li className="list-inline-item">
                        <span onClick={() => onOpenModal(chatbot)} className="modal-button" type="button" data-bs-toggle="modal" data-bs-target="#editChatbot">
                            <span title="Edit" className="px-1 text-primary"><i className="bi bi-pencil"></i></span>
                        </span>
                    </li> */}
                    <li className="list-inline-item">
                        <span onClick={() => copyCode(chatbot)} className="copy-code-button">
                            <span title="Copy Code" className="px-1 text-primary"><i className="bi bi-code-slash"></i></span>
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