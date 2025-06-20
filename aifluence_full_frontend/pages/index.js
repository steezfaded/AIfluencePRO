import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const response = await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main style={{ fontFamily: 'Arial', padding: '40px', backgroundColor: '#111', color: '#eee' }}>
      <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Aifluence Audit</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter a website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: '10px', width: '400px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Audit</button>
      </form>
      {loading && <p>Analyzing site…</p>}
      {result && (
        <pre style={{ backgroundColor: '#222', padding: '20px' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}