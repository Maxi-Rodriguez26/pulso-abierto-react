const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

export interface CryptoPriceResponse {
  bitcoin?: { usd: number };
  ethereum?: { usd: number };
  solana?: { usd: number };
  [key: string]: { usd: number } | undefined;
}

// Variable para controlar la solicitud vigente y evitar condiciones de carrera
let activeController: AbortController | null = null;

export async function fetchCryptoPrices(): Promise<CryptoPriceResponse> {
  // Si ya hay una consulta en curso, la cancelamos para evitar solapamientos
  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();

  try {
    const response = await fetch(API_URL, {
      signal: activeController.signal,
    });
    
    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.status}`);
    }
    
    const data: CryptoPriceResponse = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log('Consulta anterior cancelada.');
    }
    throw error;
  } finally {
    activeController = null;
  }
}