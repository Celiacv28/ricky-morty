import { Grid, Typography, Box } from '@mui/material';
import { ErrorMessage } from '../common/ErrorMessage';
import { Loading } from '../common/Loading';
import { CharacterCard } from './CharacterCard';
import type { Character } from '../../api/character/character.types';

interface CharacterGridProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
  onCharacterClick: (character: Character) => void;
  isFavorite?: (id: number) => boolean;
  onToggleFavorite?: (character: Character) => void;
}

export const CharacterGrid = ({ 
  characters, 
  loading, 
  error, 
  onCharacterClick,
  isFavorite,
  onToggleFavorite
}: CharacterGridProps) => {

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (characters.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary'}} >
        <Typography variant="h6" component="p">
          No hay personajes disponibles
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Intenta ajustar los filtros de búsqueda
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ justifyContent: 'center', width: '100%' }}>
      {characters.map((character) => (
        <Grid 
          key={character.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
          <CharacterCard 
            character={character} 
            onClick={onCharacterClick}
            isFavorite={isFavorite ? isFavorite(character.id) : false}
            onToggleFavorite={onToggleFavorite}
          />
        </Grid>
      ))}
    </Grid>
  );
};
