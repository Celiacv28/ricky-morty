import { Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import { Public } from '@mui/icons-material';
import type { Character } from '../../api/character/character.types';

interface LocationCharactersProps {
  characters: Character[];
  locationName: string;
  onCharacterClick: (character: Character) => void;
}

export const LocationCharacters = ({ characters, locationName, onCharacterClick }: LocationCharactersProps) => {
  if (characters.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        <Public sx={{ mr: 1, verticalAlign: 'middle' }} />
        Otros personajes en {locationName}
      </Typography>

      <Grid container spacing={2}>
        {characters.map((char) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={char.id}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
              onClick={() => onCharacterClick(char)}
            >
              <Avatar
                src={char.image}
                alt={char.name}
                sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
              />
              <Typography
                variant="body2"
                fontWeight="medium"
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {char.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {char.species}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
