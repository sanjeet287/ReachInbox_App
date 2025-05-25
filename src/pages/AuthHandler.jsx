import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      
      login(token);
      localStorage.setItem('token', token);
      
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
      
      navigate('/onebox');
    } else {      
      navigate('/login');
    }
  }, [location, navigate, login]);

  return <p>Logging in...</p>;
};

export default AuthHandler;
