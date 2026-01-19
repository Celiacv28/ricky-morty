import { useState, useEffect } from 'react';
import { characterApi } from '../api/character/characterApi';
import { locationApi } from '../api/location/locationApi';
import { episodeApi } from '../api/episode/episodeApi';
import { ERROR_MESSAGES } from '../utils/constants';
import type { Character } from '../api/character/character.types';
import type { Episode } from '../api/episode/episode.types';

interface UseCharacterDetailState {
  character: Character | null;
  locationCharacters: Character[];
  episodes: Episode[];
  loading: boolean;
  error: string | null;
}

export const useCharacterDetail = (id: string | undefined): UseCharacterDetailState => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [locationCharacters, setLocationCharacters] = useState<Character[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError(ERROR_MESSAGES.NO_ID);
      setLoading(false);
      return;
    }

     const fetchCharacterDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const characterData = await characterApi.getById(Number(id));
        setCharacter(characterData);

        if (characterData.location.url) {
          const locationId = characterData.location.url.split('/').pop();
          
          const locationData = await locationApi.getById(Number(locationId));

          const residentIds = locationData.residents 
            .slice(0, 6)           
            .map((url: string) => Number(url.split('/').pop()))
            .filter((residentId: number) => residentId !== characterData.id); 

          if (residentIds.length > 0) {
            const residents = await characterApi.getMultiple(residentIds);
            setLocationCharacters(residents);
          }
        }

        if (characterData.episode.length > 0) {
          const episodeIds = characterData.episode
            .map((url: string) => Number(url.split('/').pop()));

          const episodesData = await episodeApi.getMultiple(episodeIds);
          setEpisodes(Array.isArray(episodesData) ? episodesData : [episodesData]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : ERROR_MESSAGES.LOAD_CHARACTER);
        setCharacter(null);
        setLocationCharacters([]);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetail();
  }, [id]);


  return { character, locationCharacters, episodes, loading, error };
};
