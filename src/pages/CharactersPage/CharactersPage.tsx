
import './CharactersPage.css';
import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Chip } from '@mui/material';
import { Favorite, FilterAltOff } from '@mui/icons-material';
import { useCharacters } from '../../hooks/useCharacters';
import { useLocationCharacters } from '../../hooks/useLocationCharacters';
import { useLocations } from '../../hooks/useLocations';
import { useFavorites } from '../../hooks/useFavorites';
import { CharacterFilters } from '../../components/character/CharacterFilters';
import { CharacterGrid } from '../../components/character/CharacterGrid';
import { Pagination } from '../../components/common/Pagination';
import type { CharacterFilters as Filters, Character } from '../../api/character/character.types';
import { ITEMS_PER_PAGE, BTN_CLEAR_FILTERS, FAVORITE_LABEL_SINGULAR, FAVORITE_LABEL_PLURAL } from '../../utils/constants';

export const CharactersPage = () => {
  const navigate = useNavigate();  
  
  const [searchFilters, setSearchFilters] = useState<Filters>({});
  const [page, setPage] = useState(1);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const shouldUseApi = !showOnlyFavorites && selectedLocationId === null;
  
  const apiData = useCharacters(shouldUseApi ? { ...searchFilters, page } : {});
  const locationData = useLocationCharacters(selectedLocationId);
  const { locations } = useLocations();
  const { favoriteCharacters, loading: favLoading, error: favError, toggleFavorite, isFavorite } = useFavorites();

  let characters = apiData.characters;
  let loading = apiData.loading;
  let error = apiData.error;

  if (showOnlyFavorites) {
    characters = favoriteCharacters;
    loading = favLoading;
    error = favError;
  } else if (selectedLocationId !== null) {
    characters = locationData.characters;
    loading = locationData.loading;
    error = locationData.error;
  }


  const filteredCharacters = useMemo(() => {
    let filtered = characters;

    if (showOnlyFavorites && selectedLocationId !== null) {
      filtered = filtered.filter(c => c.location.url.includes(`/${selectedLocationId}`));
    }

    if (shouldUseApi) return filtered;

    return filtered.filter(c => {
      if (searchFilters.name && !c.name.toLowerCase().includes(searchFilters.name.toLowerCase())) return false;
      if (searchFilters.status && c.status.toLowerCase() !== searchFilters.status.toLowerCase()) return false;
      if (searchFilters.species && !c.species.toLowerCase().includes(searchFilters.species.toLowerCase())) return false;
      if (searchFilters.gender && c.gender.toLowerCase() !== searchFilters.gender.toLowerCase()) return false;
      return true;
    });
  }, [characters, showOnlyFavorites, selectedLocationId, shouldUseApi, searchFilters]);


  const paginatedCharacters = useMemo(() => {
    if (shouldUseApi) return filteredCharacters; // API already paginated
    
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredCharacters.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [shouldUseApi, filteredCharacters, page]);

  const totalPages = shouldUseApi 
    ? apiData.totalPages 
    : Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE);


  const handleFilterChange = useCallback((newFilters: Filters) => {
    setSearchFilters(newFilters);
    setPage(1);
  }, []);

  const handleLocationChange = useCallback((locationId: number | null) => {
    setSelectedLocationId(locationId);
    setPage(1);
    
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCharacterClick = (character: Character) => {
    navigate(`/characters/${character.id}`);
  };

  const clearAllFilters = () => {
    setSearchFilters({});
    setPage(1);
    setSelectedLocationId(null);
    setShowOnlyFavorites(false);
  };

  const hasActiveFilters = searchFilters.name || searchFilters.status || searchFilters.species || searchFilters.gender || selectedLocationId;

  return (
    <Container maxWidth="xl" className="characters-page">
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h5"          
          align="center" 
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Personajes de Rick and Morty
        </Typography>

        <CharacterFilters 
          onFilterChange={handleFilterChange}
          onLocationChange={handleLocationChange}
          locations={locations}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button
            variant={showOnlyFavorites ? "contained" : "outlined"}
            startIcon={<Favorite />}
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            color={showOnlyFavorites ? "error" : "inherit"}
          >
            Favoritos {favoriteCharacters.length > 0 && `(${favoriteCharacters.length})`}
          </Button>

          {hasActiveFilters && !showOnlyFavorites && (
            <Button 
              variant="outlined" 
              startIcon={<FilterAltOff />} 
              onClick={clearAllFilters} 
              color="secondary"
            >
              {BTN_CLEAR_FILTERS}
            </Button>
          )}

          {showOnlyFavorites && filteredCharacters.length > 0 && (
            <Chip 
              label={`${filteredCharacters.length} ${filteredCharacters.length !== 1 ? FAVORITE_LABEL_PLURAL : FAVORITE_LABEL_SINGULAR}`}
              onDelete={() => setShowOnlyFavorites(false)}
              color="error"
            />
          )}
        </Box>

        <CharacterGrid
          characters={paginatedCharacters}
          loading={loading}
          error={error}
          onCharacterClick={handleCharacterClick}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />

        {!loading && !error && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Box>
    </Container>
  );
};