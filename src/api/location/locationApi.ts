// api/location-service.ts
import { httpClient } from '../client';
import type { LocationDetail, LocationResponse, LocationFilters } from './location.types';

export const locationApi = {
  getAll: (filters?: LocationFilters): Promise<LocationResponse> => {
    return httpClient.get<LocationResponse>('/location', filters);
  },

  getById: (id: number): Promise<LocationDetail> => {
    return httpClient.get<LocationDetail>(`/location/${id}`);
  },

  getMultiple: async (ids: number[]): Promise<LocationDetail[]> => {
    if (ids.length === 0) return [];
    
    const data = await httpClient.get<LocationDetail | LocationDetail[]>(
      `/location/${ids.join(',')}`
    );
    
    return Array.isArray(data) ? data : [data];
  }
};