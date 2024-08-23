import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Header from '../components/Header/Header'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import PageNotFound from '../errors/PageNotFound/PageNotFound'
import Footer from '../components/Footer/Footer'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import PrivateRoute from './PrivateRoute'
import ChatPage from '../pages/ChatPage/ChatPage'
import NewChatbotPage from '../pages/NewChatbotPage/NewChatbotPage'
import ChatbotListPage from '../pages/ChatbotListPage/ChatbotListPage'
import TrainingProcessPage from '../pages/TrainingProcessPage/TrainingProcessPage'

function Routing() {
  const [notFound, setNotFound] = useState(false);
  const location = useLocation();

  // !!! update this whenever a new Route is added !!!
  useEffect(() => {
    const validPaths = [
      '/register',
      '/login',
      '/',
      '/profile',
      '/chat',
      '/new-chatbot',
      '/chatbots'
    ];

    // Check if the current path is exactly one of the valid paths or starts with '/training/'
    const isValidPath = validPaths.includes(location.pathname) || location.pathname.startsWith('/training/');

    setNotFound(!isValidPath);
  }, [location.pathname]);
  return (
    <>
      {!notFound && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/chat' element={<ChatPage />}/>
        <Route path='/new-chatbot' element={<NewChatbotPage />}/>
        <Route path='/chatbots' element={<ChatbotListPage />}/>
        <Route path="/training/:id" element={<TrainingProcessPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!notFound && <Footer />}
    </>
  );
}

export default Routing;
