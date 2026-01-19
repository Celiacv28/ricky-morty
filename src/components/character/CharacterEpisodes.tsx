import { useState } from 'react';
import { Box, Typography, Grid, Paper, Chip, Button } from '@mui/material';
import { Tv, ExpandMore, ExpandLess } from '@mui/icons-material';
import { LABEL_EPISODES, BTN_VIEW_LESS } from '../../utils/constants';
import type { Episode } from '../../api/episode/episode.types';

interface CharacterEpisodesProps {
  episodes: Episode[];
}

export const CharacterEpisodes = ({ episodes }: CharacterEpisodesProps) => {
  const [showAll, setShowAll] = useState(false);

  if (episodes.length === 0) return null;

  const displayedEpisodes = showAll ? episodes : episodes.slice(0, 3);
  const hasMore = episodes.length > 3;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        <Tv sx={{ mr: 1, verticalAlign: 'middle' }} />
        {LABEL_EPISODES} ({episodes.length})
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }} >
        {displayedEpisodes.map((episode) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={episode.id}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {episode.name}
                </Typography>
                <Chip 
                  label={episode.episode} 
                  size="small" 
                  color="primary"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {episode.air_date}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            onClick={() => setShowAll(!showAll)}
            endIcon={showAll ? <ExpandLess /> : <ExpandMore />}
          >
            {showAll ? BTN_VIEW_LESS : `Ver todos (${episodes.length})`}
          </Button>
        </Box>
      )}
    </Box>
  );
};
