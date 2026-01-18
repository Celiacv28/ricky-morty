import { useState, useEffect } from 'react';
import { characterApi } from '../api/character/characterApi';
import type { Character } from '../api/character/character.types';
import { FAVORITES_KEY } from '../utils/constants';

interface UseFavoritesState {
  favoriteCharacters: Character[];
  loading: boolean;
  error: string | null;
  toggleFavorite: (character: Character) => void;
  isFavorite: (characterId: number) => boolean;
  clearFavorites: () => void;
}

export const useFavorites = (): UseFavoritesState => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (!stored) return;

      const favoriteIds: number[] = JSON.parse(stored);
      if (favoriteIds.length === 0) return;

      setLoading(true);
      try {
        const data = await characterApi.getMultiple(favoriteIds);
        setFavoriteCharacters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar favoritos');
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);


  useEffect(() => {
    const favoriteIds = favoriteCharacters.map(c => c.id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  }, [favoriteCharacters]);

  const toggleFavorite = (character: Character) => {
    setFavoriteCharacters(prev => {
      const exists = prev.some(c => c.id === character.id);
      return exists 
        ? prev.filter(c => c.id !== character.id)
        : [...prev, character];
    });
  };

  const isFavorite = (characterId: number): boolean => {
    return favoriteCharacters.some(c => c.id === characterId);
  };

  const clearFavorites = (): void => {
    setFavoriteCharacters([]);
  };

  return {
    favoriteCharacters,
    loading,
    error,
    toggleFavorite,
    isFavorite,
    clearFavorites
  };
};
