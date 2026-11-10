interface StatusMessageProps {
  status: 'initial' | 'loading' | 'success' | 'empty' | 'error';
  onRetry?: () => void; // Función opcional para el botón de reintento
}

export function StatusMessage({ status, onRetry }: StatusMessageProps) {
  if (status === 'initial') {
    return <p className="status-empty">Presioná "Aplicar filtro" para buscar cotizaciones.</p>;
  }
  
  if (status === 'loading') {
    return <p className="status-loading">Consultando datos del mercado en tiempo real...</p>;
  }

  if (status === 'empty') {
    return <p className="status-empty">No se encontraron resultados para los criterios seleccionados.</p>;
  }

  if (status === 'error') {
    return (
      <div className="status-error">
        <p>⚠️ No se pudo completar la solicitud. Verificá tu conexión a internet o intentá en unos minutos.</p>
        {onRetry && (
          <button onClick={onRetry} className="btn" type="button" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Volver a intentar
          </button>
        )}
      </div>
    );
  }

  // Si el estado es 'success', el componente no dibuja nada para dejarle lugar a las tarjetas
  return null;
}