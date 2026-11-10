import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCryptoPrices, type CryptoPriceResponse } from '../services/cryptoService';
import { SearchForm } from '../components/SearchForm';
import { StatusMessage } from '../components/StatusMessage';
import { CryptoCard } from '../components/CryptoCard';

export function Home() {
  // 1. ESTADOS PRINCIPALES DE LA PÁGINA
  // Controlamos en qué momento de la consulta estamos
  const [status, setStatus] = useState<'initial' | 'loading' | 'success' | 'empty' | 'error'>('initial');
  
  // Guardamos los datos ORIGINALES que trae la API
  const [data, setData] = useState<CryptoPriceResponse>({});
  
  // Guardamos qué está buscando el usuario
  const [filterTerm, setFilterTerm] = useState('');

  // 2. FUNCIÓN QUE SE EJECUTA AL ENVIAR EL FORMULARIO
  const handleSearch = async (term: string, _currency: string) => {
    setStatus('loading');
    setFilterTerm(term.toLowerCase()); // Guardamos la palabra clave en minúsculas
    
    try {
      // Llamamos a nuestro servicio externo (separación de responsabilidades)
      const result = await fetchCryptoPrices();
      setData(result);
      
      // Verificamos si la API no devolvió nada
      if (Object.keys(result).length === 0) {
        setStatus('empty');
      } else {
        setStatus('success');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  // 3. DATOS DERIVADOS (Lo pide la consigna explícitamente)
  // Calculamos la lista VISIBLE filtrando los datos originales con lo que el usuario escribió.
  // No usamos un "setEstado" para esto, se calcula al vuelo en cada renderizado.
  const visibleCryptos = Object.entries(data).filter(([coinName]) => 
    coinName.toLowerCase().includes(filterTerm)
  );

  // Dato derivado para contar resultados
  const resultsCount = visibleCryptos.length;

  // Si la API trajo cosas, pero el filtro escondió todas, mostramos el mensaje de vacío
  const displayStatus = (status === 'success' && resultsCount === 0) ? 'empty' : status;

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2>Consulta de Mercado</h2>
        <p>Plataforma de consulta en tiempo real.</p>
      </header>

      {/* Componente 1: Formulario */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <SearchForm onSearch={handleSearch} />
      </div>

      <section style={{ marginTop: '2rem' }}>
        {/* Componente 2: Mensajes de estado */}
        <div style={{ textAlign: 'center' }}>
          <StatusMessage 
            status={displayStatus} 
            onRetry={() => handleSearch(filterTerm, 'usd')} 
          />
        </div>
        
        {/* Componente 3: Resultados */}
        {displayStatus === 'success' && (
          <>
            <p style={{ marginBottom: '1rem', color: '#64748b' }}>
              Resultados encontrados: <strong>{resultsCount}</strong>
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {visibleCryptos.map(([coinName, values]) => (
                <div key={coinName} style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', minWidth: '200px', textAlign: 'center' }}>
                  
                  {/* Reutilizamos la tarjeta */}
                  <CryptoCard coinName={coinName} price={values?.usd || 0} />
                  
                  {/* Link a la vista de detalle dinámico */}
                  <Link 
                    to={`/criptomonedas/${coinName}`} 
                    style={{ display: 'inline-block', marginTop: '1rem', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    Ver detalle →
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}