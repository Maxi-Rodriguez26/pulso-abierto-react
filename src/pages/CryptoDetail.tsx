import { useParams, Link } from 'react-router-dom';
import { useFavoritesStore } from '../store/useFavoritesStore';

const allowedCryptos = ['bitcoin', 'ethereum', 'solana'];

export function CryptoDetail() {
  const { id } = useParams<{ id: string }>();
  const cryptoId = id ? id.toLowerCase() : '';
  const isValid = allowedCryptos.includes(cryptoId);

  // Conectamos Zustand también en la página de detalle
  const isFavorite = useFavoritesStore((state) => state.favorites.includes(cryptoId));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  if (!isValid) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Recurso no encontrado</h2>
        <p>La criptomoneda que buscas no existe en nuestra plataforma.</p>
        <Link to="/" style={{ color: '#2563eb', fontWeight: 'bold' }}>Volver al inicio</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ textTransform: 'capitalize', fontSize: '2rem', marginBottom: '0.5rem' }}>
        Detalle de {id}
      </h2>

      {/* Botón de favorito en la vista de detalle */}
      <button
        onClick={() => toggleFavorite(cryptoId)}
        style={{
          padding: '0.5rem 1rem',
          marginBottom: '1.5rem',
          cursor: 'pointer',
          backgroundColor: isFavorite ? '#fef08a' : '#f1f5f9',
          border: '1px solid #cbd5e1',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}
      >
        {isFavorite ? '⭐ Quitar de favoritos' : '☆ Marcar como favorito'}
      </button>

      <p style={{ marginBottom: '2rem' }}>
        Aquí podrías cargar más información específica sobre {id}, como gráficos históricos o volumen de mercado.
      </p>
      
      <Link 
        to="/" 
        style={{ padding: '0.5rem 1rem', backgroundColor: '#e2e8f0', color: '#0f172a', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}
      >
        ← Volver a la lista
      </Link>
    </main>
  );
}