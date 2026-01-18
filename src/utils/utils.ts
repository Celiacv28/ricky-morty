import type { Character } from '../api/character/character.types';

export const getStatusColor = (status: Character['status']): 'success' | 'error' | 'default' => {
  switch (status) {
    case 'Alive':
      return 'success';
    case 'Dead':
      return 'error';
    default:
      return 'default';
  }
};
