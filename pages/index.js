import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/absensi')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p style={{color:'white'}}>Loading...</p>;

  const sorted = Object.values(data.leaderboard)
    .sort((a, b) => b.total - a.total);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: 'white',
      fontFamily: 'sans-serif',
      padding: 20
    }}>

      <h1 style={{fontSize: 30}}>🏫 Dashboard Absensi</h1>

      {/* LEADERBOARD */}
      <h2 style={{marginTop: 30}}>🏆 Leaderboard</h2>

      {sorted.map((u, i) => (
        <div key={i} style={{
          display: 'flex',
          justifyContent: 'space-between',
          background: '#1e293b',
          padding: 15,
          marginTop: 10,
          borderRadius: 12
        }}>
          <div>
            <b>#{i + 1} {u.nama}</b><br/>
            <small>
              {u.kelas.includes('IPA') && '🫀 '}
              {u.kelas.includes('IPS') && '📊 '}
              {u.kelas.includes('Bahasa') && '📒 '}
              {u.kelas}
            </small>
          </div>
          <div>{u.total} hari</div>
        </div>
      ))}

      {/* LOG */}
      <h2 style={{marginTop: 40}}>📋 Log Absensi</h2>

      {data.logs.slice(0, 15).map((log, i) => (
        <div key={i} style={{
          background: '#0f172a',
          padding: 10,
          marginTop: 5,
          borderRadius: 8
        }}>
          {log.nama} — {log.kelas} — {log.jam}
        </div>
      ))}

    </div>
  );
}
