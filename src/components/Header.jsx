import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const { logout } = useAuth();
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid gray' }}>
      <h2>ReachInbox</h2>
      <div>
        <button onClick={() => setDarkMode(d => !d)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={logout} style={{ marginLeft: 8 }}>
          Logout
        </button>
      </div>
    </header>
  );
}
