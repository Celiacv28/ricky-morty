import { httpClient } from '../client';
import type { Character, CharacterResponse, CharacterFilters } from './character.types';

export const characterApi = {
  getAll: (filters?: CharacterFilters): Promise<CharacterResponse> => {
    return httpClient.get<CharacterResponse>('/character', filters);
  },

  getById: (id: number): Promise<Character> => {
    return httpClient.get<Character>(`/character/${id}`);
  },

  getMultiple: async (ids: number[]): Promise<Character[]> => {
    if (ids.length === 0) return [];
    
    const data = await httpClient.get<Character | Character[]>(
      `/character/${ids.join(',')}`
    );
    
    return Array.isArray(data) ? data : [data];
  }
};
