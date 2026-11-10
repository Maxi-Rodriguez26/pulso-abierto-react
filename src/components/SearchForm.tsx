import { useState } from 'react';
import { z } from 'zod';

// 1. Definimos el esquema de validación con Zod como pide la consigna
const searchSchema = z.object({
  // Pedimos mínimo 2 caracteres y limpiamos espacios vacíos (trim)
  searchTerm: z.string().min(2, 'Ingresá al menos 2 caracteres').trim(),
  // Validamos que seleccione una opción permitida
  currency: z.enum(['usd', 'eur', 'ars'], {
    error: 'Seleccioná una moneda válida',
  }),
});

// Definimos qué función recibe el formulario para avisarle a la página principal
interface SearchFormProps {
  onSearch: (term: string, currency: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  // Estados para controlar los valores de los inputs
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState('usd');
  
  // Estado para guardar los mensajes de error de Zod
  const [errors, setErrors] = useState<{ searchTerm?: string; currency?: string }>({});

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 2. Validamos los datos ingresados usando safeParse de Zod
    const result = searchSchema.safeParse({ searchTerm, currency });
    
    if (!result.success) {
      // Si hay error, extraemos los mensajes y cortamos la ejecución
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        searchTerm: fieldErrors.searchTerm?.[0],
        currency: fieldErrors.currency?.[0],
      });
      return; 
    }

    // Si los datos son válidos, limpiamos errores y ejecutamos la búsqueda
    setErrors({});
    onSearch(result.data.searchTerm, result.data.currency);
  };

  return (
    <form onSubmit={handleSubmit} className="crypto-form">
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="search" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Filtrar criptomoneda:
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ej: bitcoin o solana"
          style={{ padding: '0.5rem', width: '100%', maxWidth: '300px' }}
        />
        {/* Mostramos el error de Zod si existe, sin depender solo del color */}
        {errors.searchTerm && (
          <span style={{ display: 'block', color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            ⚠️ {errors.searchTerm}
          </span>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="currency" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Moneda de referencia:
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', maxWidth: '300px' }}
        >
          <option value="usd">Dólares (USD)</option>
          <option value="eur">Euros (EUR)</option>
          <option value="ars">Pesos Argentinos (ARS)</option>
        </select>
        {errors.currency && (
          <span style={{ display: 'block', color: '#dc2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            ⚠️ {errors.currency}
          </span>
        )}
      </div>

      <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Aplicar filtro
      </button>
    </form>
  );
}