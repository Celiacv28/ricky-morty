
import { Box, Card, CardContent, CardMedia, Typography, Chip, Divider, Grid } from '@mui/material';
import { Person, Psychology, Transgender, LocationOn, Explore } from '@mui/icons-material';
import type { Character } from '../../api/character/character.types';
import { getStatusColor } from '../../utils/utils';
import { STATUS_OPTIONS, LABEL_SPECIES, LABEL_STATUS, LABEL_GENDER, LABEL_TYPE, LABEL_CURRENT_LOCATION, LABEL_ORIGIN, UNKNOWN_LABEL } from '../../utils/constants';
import type { SvgIconComponent } from '@mui/icons-material';

interface CharacterDetailProps {
  character: Character;
}

interface InfoItemProps {
  icon: SvgIconComponent;
  label: string;
  value: string;
  alignTop?: boolean;
}

const InfoItem = ({ icon: Icon, label, value, alignTop = false }: InfoItemProps) => (
  <Box sx={{ display: 'flex', alignItems: alignTop ? 'flex-start' : 'center', mb: 2 }}>
    <Icon sx={{ mr: 2, color: 'primary.main', ...(alignTop && { mt: 0.5 }) }} />
    <Box>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="body1" fontWeight="medium">{value}</Typography>
    </Box>
  </Box>
);

export const CharacterDetail = ({ character }: CharacterDetailProps) => {
  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <Grid container>
        <Grid size={{ xs: 12, md: 5 }}>
          <CardMedia
            component="img"
            image={character.image}
            alt={character.name}
            sx={{
              width: '100%',
              height: { xs: 300, md: '100%' },
              objectFit: 'cover',
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {character.name}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Chip
                label={character.status}
                color={getStatusColor(character.status)}
                sx={{ mr: 1, mb: 1 }}
              />
              <Chip label={character.species} variant="outlined" sx={{ mr: 1, mb: 1 }} />
              {character.type && (
                <Chip label={character.type} variant="outlined" sx={{ mb: 1 }} />
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoItem icon={Person} label={LABEL_SPECIES} value={character.species} />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoItem icon={Transgender} label={LABEL_GENDER} value={character.gender} />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoItem 
                  icon={Psychology} 
                  label={LABEL_STATUS}
                  value={STATUS_OPTIONS.find(opt => opt.value === character.status.toLowerCase())?.label || UNKNOWN_LABEL}
                />
              </Grid>

              {character.type && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <InfoItem icon={Person} label={LABEL_TYPE} value={character.type} />
                </Grid>
              )}

              <Grid size={{ xs: 12 }}>
                <InfoItem icon={LocationOn} label={LABEL_CURRENT_LOCATION} value={character.location.name} alignTop />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <InfoItem icon={Explore} label={LABEL_ORIGIN} value={character.origin.name} alignTop />
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
