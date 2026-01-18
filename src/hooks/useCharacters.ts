import { useState, useEffect } from 'react';
import { characterApi } from '../api/character/characterApi';
import type { Character, CharacterFilters } from '../api/character/character.types';

interface UseCharactersState {
  characters: Character[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

export const useCharacters = (filters: CharacterFilters = {}): UseCharactersState => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await characterApi.getAll(filters);
        
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar personajes');
        setCharacters([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [filters.name, filters.status, filters.species, filters.gender, filters.page]);

  return { characters, loading, error, totalPages };
};