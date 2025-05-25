import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import OneboxList from '../components/OneBoxList';
import OneboxDetail from '../components/OneBoxDetail';
import Header from '../components/Header';

export default function Onebox() {
  const { token } = useAuth();
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [emails, setEmails] = useState([]);

  
  const refreshEmails = () => {
    setSelectedThreadId(null);
  };


  useEffect(() => {
    function handleKey(e) {
      if (!emails.length) return;
      if (selectedThreadId === null) return;

      const index = emails.findIndex(e => e.threadId === selectedThreadId);
      if (e.key === 'j') {
   
        if (index < emails.length - 1) setSelectedThreadId(emails[index + 1].threadId);
      } else if (e.key === 'k') {
  
        if (index > 0) setSelectedThreadId(emails[index - 1].threadId);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [emails, selectedThreadId]);

  return (
    <>
      <Header />
      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        <div style={{ width: '30%', borderRight: '1px solid gray', overflowY: 'auto' }}>
          <OneboxList 
            token={token} 
            onSelect={(id) => setSelectedThreadId(id)} 
            key={selectedThreadId} 
            ref={(el) => {
              if (el && el.state && el.state.emails) setEmails(el.state.emails);
            }}
          />
        </div>
        <div style={{ width: '70%', padding: 16, overflowY: 'auto' }}>
          {selectedThreadId ? (
            <OneboxDetail token={token} threadId={selectedThreadId} onBack={refreshEmails} />
          ) : (
            <p>Select an email to read.</p>
          )}
        </div>
      </div>
    </>
  );
}
