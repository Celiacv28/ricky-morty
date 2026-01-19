import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useCharacterDetail } from '../../hooks/useCharacterDetail';
import { CharacterDetail } from '../../components/character/CharacterDetail';
import { CharacterEpisodes } from '../../components/character/CharacterEpisodes';
import { LocationCharacters } from '../../components/character/LocationCharacters';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Loading } from '../../components/common/Loading';
import type { Character } from '../../api/character/character.types';
import { ERROR_MESSAGES, BTN_BACK_TO_LIST } from '../../utils/constants';

export const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { character, locationCharacters, episodes, loading, error } = useCharacterDetail(id);

  const handleBack = () => {
    navigate('/characters');
  };

  const handleCharacterClick = (character: Character) => {
    navigate(`/characters/${character.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {!loading && (
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{ mb: 3 }}
            variant="outlined"
          >
            {BTN_BACK_TO_LIST}
          </Button>
        )}

        {loading && <Loading />}
        
        {error && <ErrorMessage message={ERROR_MESSAGES.NOT_FOUND} />}
        
        {character && (
          <>
            <CharacterDetail character={character} />
            <Box sx={{ mt: 4 }}>
              <CharacterEpisodes episodes={episodes} />
            </Box>
            <Box sx={{ mt: 6 }}>
              <LocationCharacters 
                characters={locationCharacters}
                locationName={character.location.name}
                onCharacterClick={handleCharacterClick}
              />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};
