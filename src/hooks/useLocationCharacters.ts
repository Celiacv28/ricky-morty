import { useState, useEffect } from 'react';
import { locationApi } from '../api/location/locationApi';
import { characterApi } from '../api/character/characterApi';
import type { Character } from '../api/character/character.types';

interface UseLocationCharactersState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

export const useLocationCharacters = (locationId: number | null): UseLocationCharactersState => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!locationId) {
      setCharacters([]);
      return;
    }

    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        const location = await locationApi.getById(locationId);
        const ids = location.residents.map((url: string) => Number(url.split('/').pop()));
        
        if (ids.length > 0) {
          const data = await characterApi.getMultiple(ids);
          setCharacters(Array.isArray(data) ? data : [data]);
        } else {
          setCharacters([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar personajes de la location');
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [locationId]);

  return { characters, loading, error };
};
