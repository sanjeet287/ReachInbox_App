import { useState } from 'react';

export default function Editor({ initialBody = '', onSave }) {
  const [body, setBody] = useState(initialBody);

  const handleSave = () => {
    onSave(body);
  };

  return (
    <div>
      <textarea
        style={{ width: '100%', height: 200 }}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={handleSave} style={{ marginTop: 8 }}>
        Save
      </button>
    </div>
  );
}
