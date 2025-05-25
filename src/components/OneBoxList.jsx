import { useState, useEffect } from 'react';
import { apiGet } from '../utils/api';

export default function OneboxList({ token, onSelect }) {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    async function fetchEmails() {
      try {
        const data = await apiGet('/onebox/list', token);
        console.log("Fetched emails:", data); 

       
       if (Array.isArray(data)) {
        setEmails(data);
      } else if (Array.isArray(data?.data)) {
        // maybe the emails are under `data.data`
        setEmails(data.data);
      } else if (Array.isArray(data?.emails)) {
        // maybe under `data.emails`
        setEmails(data.emails);
      } else {
        throw new Error("Unexpected response format");
      }
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchEmails();
  }, [token]);

  if (loading) return <p>Loading emails...</p>;
  if (error) return <p>Error loading emails: {error}</p>;
  if (!emails.length) return <p>No emails found.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {emails.map((email) => (
        <li 
          key={email.threadId} 
          style={{ padding: '8px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
          onClick={() => onSelect(email.threadId)}
        >
          <strong>{email.subject || '(No Subject)'}</strong><br />
          From: {email.fromName || email.from}<br />
          Date: {new Date(email.date).toLocaleString()}
        </li>
      ))}
    </ul>
  );
}
