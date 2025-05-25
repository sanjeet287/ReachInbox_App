import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Onebox from './pages/Onebox';
import ProtectedRoute from './components/ProtectedRoute';
import GoogleLogin from './pages/GoogleLogin';
import AuthHandler from './pages/AuthHandler';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/onebox" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path='/google-login' element={<GoogleLogin />}/>
          <Route path="/auth-handler" element={<AuthHandler />} />
          <Route
            path="/onebox"
            element={
              <ProtectedRoute>
                <Onebox />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p>404: Not Found</p>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
