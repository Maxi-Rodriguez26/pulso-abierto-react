import { describe, it, expect, vi } from 'vitest';
import { fetchCryptoPrices } from './services/cryptoService';

describe('Pruebas de la Capa de Servicios y Lógica', () => {
  it('Debería fallar (response.ok falso) si la API responde con un error HTTP', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }));

    await expect(fetchCryptoPrices()).rejects.toThrow('Error en el servidor: 500');

    vi.unstubAllGlobals();
  });
});