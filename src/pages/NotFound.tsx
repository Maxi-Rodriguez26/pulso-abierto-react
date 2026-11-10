import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Error 404</h1>
      <p>La página que estás buscando no existe.</p>
      <Link to="/" style={{ color: '#2563eb', fontWeight: 'bold' }}>Volver al inicio</Link>
    </main>
  );
}