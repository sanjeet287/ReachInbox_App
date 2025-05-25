import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/onebox');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleRedirect = () => {
    navigate('/google-login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-2"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleGoogleRedirect}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
