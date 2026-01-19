export const STATUS_OPTIONS = [
  { value: 'alive', label: 'Vivo' },
  { value: 'dead', label: 'Muerto' },
  { value: 'unknown', label: 'Desconocido' }
] as const;

export const FAVORITES_KEY = 'rickandmorty_favorites';
export const ITEMS_PER_PAGE = 20;

// App texts
export const APP_TITLE = 'Rick and Morty Portal';
export const HOME_TITLE = 'Bienvenido al Portal';
export const HOME_SUBTITLE = 'Explora el universo de Rick and Morty. Descubre todos los personajes';

// Labels
export const LABEL_LOCATION = 'Localización';
export const LABEL_STATUS = 'Estado';
export const OPTION_ALL = 'Todos';
export const OPTION_ALL_FEM = 'Todas';
export const LABEL_GENDER = 'Género:';
export const LABEL_LOCATION_PREFIX = 'Ubicación:';
export const LABEL_ORIGIN = 'Origen:';
export const LABEL_SPECIES = 'Especie';
export const LABEL_TYPE = 'Tipo';
export const LABEL_CURRENT_LOCATION = 'Ubicación Actual';
export const LABEL_EPISODES = 'Episodios';

// Buttons
export const BTN_ACCESS = 'Acceder';
export const BTN_CLEAR_FILTERS = 'Limpiar filtros';
export const BTN_VIEW_LESS = 'Ver menos';
export const BTN_BACK_TO_LIST = 'Volver al listado';

// Search placeholders / labels
export const SEARCH_LABEL_NAME = 'Buscar por nombre';
export const SEARCH_LABEL_SPECIES = 'Buscar por especie';
export const SEARCH_PLACEHOLDER_NAME = 'Ej: Rick';
export const SEARCH_PLACEHOLDER_SPECIES = 'Ej: Human';

// Error messages
export const ERROR_MESSAGES = {
  LOAD_LOCATIONS: 'Error al cargar ubicaciones',
  LOAD_LOCATION_CHARACTERS: 'Error al cargar personajes de la ubicación',
  LOAD_FAVORITES: 'Error al cargar favoritos',
  LOAD_CHARACTERS: 'Error al cargar personajes',
  NO_ID: 'ID de personaje no proporcionado',
  LOAD_CHARACTER: 'Error al cargar el personaje',
  NOT_FOUND: 'Personaje no encontrado'
} as const;

export const UNKNOWN_LABEL = 'Desconocido';

// Labels for favorites
export const FAVORITE_LABEL_SINGULAR = 'favorito';
export const FAVORITE_LABEL_PLURAL = 'favoritos';



