import { useFavoritesStore } from '../store/useFavoritesStore';

interface CryptoCardProps {
  coinName: string;
  price: number;
}

export function CryptoCard({ coinName, price }: CryptoCardProps) {
  // Usamos selectores de Zustand para saber si esta cripto es favorita y obtener la acción
  const isFavorite = useFavoritesStore((state) => state.favorites.includes(coinName.toLowerCase()));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return (
    <article className="crypto-card" tabIndex={0} style={{ position: 'relative' }}>
      {/* Botón de Favorito (Estrella o Corazón) */}
      <button 
        onClick={() => toggleFavorite(coinName.toLowerCase())}
        title={isFavorite ? "Quitar de favoritos" : "Marcar como favorito"}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '1.2rem',
          cursor: 'pointer',
        }}
      >
        {isFavorite ? '⭐' : '☆'}
      </button>

      <h3 className="crypto-name" style={{ textTransform: 'capitalize' }}>
        {coinName}
      </h3>
      <p className="crypto-price">
        {formattedPrice} <small style={{ fontSize: '0.8rem', color: '#64748b' }}>USD</small>
      </p>
    </article>
  );
}