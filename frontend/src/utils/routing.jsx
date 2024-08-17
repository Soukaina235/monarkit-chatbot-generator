import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Header from '../components/Header/Header'
import HomePage from '../pages/HomePage/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import PageNotFound from '../errors/PageNotFound/PageNotFound'
import Footer from '../components/Footer/Footer'

function Routing() {
  const [notFound, setNotFound] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setNotFound(['/register', '/login', '/'].every((path) => path !== location.pathname));
  }, [location.pathname]);

  return (
    <>
      {!notFound && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!notFound && <Footer />}
    </>
  );
}

export default Routing;
