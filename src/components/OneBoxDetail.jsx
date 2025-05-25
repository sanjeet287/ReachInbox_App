import { useEffect, useState } from 'react';
import { apiGet, apiDelete, apiPost } from '../utils/api';

export default function OneboxDetail({ token, threadId, onBack }) {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  const [replying, setReplying] = useState(false);
  const [replyBody, setReplyBody] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!threadId) return;

    async function fetchEmail() {
      try {
        const response = await apiGet(`/onebox/messages/${threadId}`, token);
        if (Array.isArray(response.data) && response.data.length > 0) {
      
      setEmail(response.data[0]);
        }    
        
      } catch (err) {
        setError(err.message);
      }
    }
    fetchEmail();
  }, [threadId, token]);
console.log("Email has to read: ", email);
  if (error) return <p>Error: {error}</p>;
  if (!email) return <p>Loading email...</p>;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this email?')) return;
    try {
      await apiDelete(`/onebox/messages/${threadId}`, token);
      onBack();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleReply = async () => {
    if (!replyBody.trim()) {
      alert('Reply body cannot be empty');
      return;
    }
    setSending(true);

    const replyPayload = {
      toName: email.fromEmail || email.from,
      to: email.from,
      from: email.to,
      fromName: email.toEmail || email.to,
      subject: `Re: ${email.subject || ''}`,
      body: replyBody,
      references: email.references || [],
      inReplyTo: email.inReplyTo || email.messageId || '',
    };

    try {
      await apiPost('/onebox/reply', replyPayload, token);
      alert('Reply sent!');
      setReplying(false);
      setReplyBody('');
    } catch (err) {
      alert('Failed to send reply: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <button onClick={onBack}>Back to list</button>
      <h3>{email.subject || '(No Subject)'}</h3>
      <p><strong>From:</strong> {email.fromName || email.from}</p>
      <p><strong>To:</strong> {email.toName || email.to}</p>
      <div dangerouslySetInnerHTML={{ __html: email.body }} style={{ border: '1px solid #ddd', padding: 10 }} />
      
      <button onClick={handleDelete} style={{ marginRight: 8 }}>Delete</button>
      <button onClick={() => setReplying(!replying)}>{replying ? 'Cancel Reply' : 'Reply'}</button>

      {replying && (
        <div style={{ marginTop: 10 }}>
          <textarea
            rows={6}
            style={{ width: '100%' }}
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            placeholder="Type your reply here (HTML supported)"
          />
          <button onClick={handleReply} disabled={sending}>
            {sending ? 'Sending...' : 'Send Reply'}
          </button>
        </div>
      )}
    </div>
  );
}
