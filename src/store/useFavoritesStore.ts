import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definimos el tipado para nuestro estado global
interface FavoritesState {
  favorites: string[]; // Guardaremos los IDs de las criptos (ej: 'bitcoin')
  toggleFavorite: (id: string) => void; // Acción para agregar o quitar
}

// Creamos el store de Zustand y lo envolvemos con "persist" para guardarlo en localStorage
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      
      // Función que actualiza de forma inmutable
      toggleFavorite: (id) =>
        set((state) => {
          // Si la cripto ya está en favoritos, la sacamos (filter)
          if (state.favorites.includes(id)) {
            return { favorites: state.favorites.filter((favId) => favId !== id) };
          }
          // Si no está, la agregamos al final (spread operator)
          return { favorites: [...state.favorites, id] };
        }),
    }),
    {
      name: 'cripto-favoritos', // El nombre con el que se guardará en el navegador
    }
  )
);