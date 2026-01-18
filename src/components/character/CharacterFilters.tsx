import { useState, useEffect } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Paper, Grid, Button } from '@mui/material';
import { ClearAll } from '@mui/icons-material';
import { useDebounce } from '../../hooks/useDebounce';
import type { CharacterFilters as Filters } from '../../api/character/character.types';
import type { LocationDetail } from '../../api/location/location.types';
import { STATUS_OPTIONS } from '../../utils/constants';

interface CharacterFiltersProps {
  onFilterChange: (filters: Filters) => void;
  onLocationChange: (locationId: number | null) => void;
  locations: LocationDetail[];
}

export const CharacterFilters = ({ onFilterChange, onLocationChange, locations }: CharacterFiltersProps) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState<string>('');

  const debouncedName = useDebounce(name, 500);
  const debouncedSpecies = useDebounce(species, 500);

  const handleClearFilters = () => {
    setName('');
    setSpecies('');
    setStatus('');
    setLocation('');
    onLocationChange(null);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onLocationChange(value ? Number(value) : null);
  };

  useEffect(() => {
    const filters: Filters = {};

    if (debouncedName) filters.name = debouncedName;
    if (debouncedSpecies) filters.species = debouncedSpecies;
    if (status) filters.status = status;

    onFilterChange(filters);
  }, [debouncedName, debouncedSpecies, status, onFilterChange]);

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        mb: 4,
        backgroundColor: 'background.paper'
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            fullWidth
            label="Buscar por nombre"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Rick"
            size="small"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            fullWidth
            label="Buscar por especie"
            variant="outlined"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            placeholder="Ej: Human"
            size="small"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="location-label">Localización</InputLabel>
            <Select
              labelId="location-label"
              id="location-select"
              value={location}
              label="Localización"
              onChange={(e) => handleLocationChange(e.target.value)}
            >
              <MenuItem value="">
                <em>Todas</em>
              </MenuItem>
              {locations.map((loc) => (
                <MenuItem key={loc.id} value={loc.id.toString()}>
                  {loc.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="status-label">Estado</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              value={status}
              label="Estado"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="">
                <em>Todos</em>
              </MenuItem>
              {STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ClearAll />}
            onClick={handleClearFilters}
            disabled={!name && !species && !status && !location}
          >
            Limpiar filtros
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
