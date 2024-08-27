import { useState } from "react";
import "./ChatbotWidget.css";
import { useParams } from "react-router-dom";

const ChatWidget = () => {

    const { chatbotId } = useParams();
    const { companyName } = useParams();

    // const responses = {
    //     "hello": "Hi there! How can I assist you today?",
    //     "coding hubs": "Here you will get Notes, Ebooks, project source Code, Interview questions. visit Coding Hubs.<a href='https://thecodinghubs.com' target='_blank'>Visit Website</a>",
    //     "how are you": "I'm just a bot, but I'm here to help you!",
    //     "need help": "How I can help you today?",
    //     "bye": "Goodbye! Have a great day!",
    //     "default": "I'm sorry, I didn't understand that. Want to connect with expert?",
    //     "expert": "Great! Please wait a moment while we connect you with an expert.",
    //     "no": "Okay, if you change your mind just let me know!"
    // };


    // const [isVisible, setIsVisible] = useState(false);

    // // Toggle function
    // const toggleChatbot = () => {
    //     setIsVisible(prevState => !prevState);
    // };

    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    
    function sendMessage(e) {
        console.log('sendMessage : ', e);
        console.log('userInput : ', userInput);
        // const userInput = document.getElementById('user-input').value.trim();
        if (userInput !== '') {
            appendMessage('user', userInput);
            respondToUser(userInput); // .toLowerCase()
            // document.getElementById('user-input').value = '';
            setUserInput('');
        }
    }

    function sendMessageOnEnter(e) {
        if (e.key === 'Enter') {
            sendMessage(e);
        }
    }
    
    const respondToUser = async (userInput) => {
        console.log('respondToUser called');
        // const response = responses[userInput] || responses["default"];
        // setTimeout(function() {
        //     appendMessage('bot', response);
        // }, 500);


        // // Send the message to the backend (Django) to get a response
        // const response = await axios.post('/api/chatbot/send-message/', {
        //     chatbot_id: chatbotId,
        //     message: userInput
        // });

        // const accessToken = JSON.parse(localStorage.getItem('authTokens')).access
        // const companyName = getCompanyNameFromToken(accessToken);

        console.log('chatbotId : ', chatbotId);

        const response = await fetch('http://127.0.0.1:8000/api/chatbots/send-message/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${accessToken}`, // Add the Authorization header
            },
            body: JSON.stringify({
                company_name: companyName,
                chatbot_id: chatbotId,
                user_input: userInput,
            }),
        });
    
        const backendResponse = await response.json();
        console.log("chatbotAnswer : ", backendResponse);
        // return data.message;

        // Add the chatbot's response to the conversation
        const botMessage = { sender: 'bot', message: backendResponse.message };
        appendMessage(botMessage.sender, botMessage.message);
    }
    
    function appendMessage(sender, message) {
        setMessages(prevMessages => [...prevMessages, { sender, message }]);

        // const chatBox = document.getElementById('chat-box');
        // const messageElement = document.createElement('div');
        // messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        // messageElement.innerHTML = message;
        // chatBox.appendChild(messageElement);
        // chatBox.scrollTop = chatBox.scrollHeight;
        // if (sender === 'bot' && message === responses["default"]) {
        //     const buttonYes = document.createElement('button');
        //     buttonYes.textContent = '✔ Yes';
        //     buttonYes.onclick = function() {
        //         appendMessage('bot', responses["expert"]);
        //     };
        //     const buttonNo = document.createElement('button');
        //     buttonNo.textContent = '✖ No';
        //     buttonNo.onclick = function() {
        //         appendMessage('bot', responses["no"]);
        //     };
        //     const buttonContainer = document.createElement('div');
        //     buttonContainer.classList.add('button-container');
        //     buttonContainer.appendChild(buttonYes);
        //     buttonContainer.appendChild(buttonNo);
        //     chatBox.appendChild(buttonContainer);
        // }
    }

    return (
        <main className="chat-widget-container"> 
            {/* <button onClick={toggleChatbot} id="chatbot-toggle-btn"><i className="bi bi-robot"></i></button> */}

            {/* {!isVisible && */}
                <div className="chatbot-popup" id="chatbot-popup">
                    <div className="chat-header">
                        <span>Chatbot | <a href="#" target="_blank">Monarkit</a></span>
                        <button id="close-btn">&times;</button>
                    </div>
                    <div className="chat-box" id="chat-box">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                                <div dangerouslySetInnerHTML={{ __html: msg.message }} />
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input 
                            value={userInput} 
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => sendMessageOnEnter(e)} 
                            type="text" 
                            id="user-input" 
                            placeholder="Type a message..." 
                        />
                        <button onClick={(e) => sendMessage(e)} id="send-btn">Send</button>
                    </div>
                    <div className="copyright">
                        <a  href="#" target="_blank">Monarkit © 2024</a>
                    </div>
                </div>
            {/* } */}
        </main>
    )
}

export default ChatWidget;