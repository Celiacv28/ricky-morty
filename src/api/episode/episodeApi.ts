import { httpClient } from '../client';
import type { Episode, EpisodeResponse, EpisodeFilters } from './episode.types';

export const episodeApi = {
  getAll: (filters?: EpisodeFilters): Promise<EpisodeResponse> => {
    return httpClient.get<EpisodeResponse>('/episode', filters);
  },

  getById: (id: number): Promise<Episode> => {
    return httpClient.get<Episode>(`/episode/${id}`);
  },

  getMultiple: async (ids: number[]): Promise<Episode[]> => {
    if (ids.length === 0) return [];
    
    const data = await httpClient.get<Episode | Episode[]>(
      `/episode/${ids.join(',')}`
    );
    
    return Array.isArray(data) ? data : [data];
  }
};
