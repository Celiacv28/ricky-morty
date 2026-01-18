import { useState, useEffect } from 'react';
import { locationApi } from '../api/location/locationApi';
import type { LocationDetail, LocationFilters } from '../api/location/location.types';

interface UseLocationsState {
  locations: LocationDetail[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

export const useLocations = (filters: LocationFilters = {}): UseLocationsState => {
  const [locations, setLocations] = useState<LocationDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await locationApi.getAll(filters);
        
        setLocations(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar ubicaciones');
        setLocations([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [filters.name, filters.type, filters.dimension, filters.page]);

  return { locations, loading, error, totalPages };
};
