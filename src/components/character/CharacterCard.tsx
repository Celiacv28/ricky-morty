import { Card, CardMedia, CardContent, Typography, Chip, Box, CardActionArea, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import type { Character } from '../../api/character/character.types';
import { getStatusColor } from '../../utils/utils';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (character: Character) => void;
}

const ellipsisStyles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
} as const;

export const CharacterCard = ({ character, onClick, isFavorite = false, onToggleFavorite }: CharacterCardProps) => {

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (onToggleFavorite) {
      onToggleFavorite(character);
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        }
      }}
    >
      {onToggleFavorite && (
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            }
          }}
          size="small"
        >
          {isFavorite ? (
            <Favorite sx={{ color: 'error.main' }} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
      )}
      <CardActionArea 
        onClick={() => onClick(character)}
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'stretch'
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={character.image}
          alt={character.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h3"
            sx={{ 
              fontWeight: 'bold',
              ...ellipsisStyles
            }}
          >
            {character.name}
          </Typography>
          
          <Box sx={{ mb: 1 }}>
            <Chip 
              label={character.status} 
              color={getStatusColor(character.status)}
              size="small"
              sx={{ mr: 1 }}
            />
            <Chip 
              label={character.species} 
              variant="outlined"
              size="small"
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>Género:</strong> {character.gender}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={ellipsisStyles}
          >
            <strong>Ubicación:</strong> {character.location.name}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={ellipsisStyles}
          >
            <strong>Origen:</strong> {character.origin.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
