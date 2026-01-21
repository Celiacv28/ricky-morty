# Rick and Morty App

Interactive web application to explore characters, locations, and episodes from the Rick and Morty universe, consuming the [Rick and Morty API](https://rickandmortyapi.com/).

## 🚀 Getting Started

### Prerequisites

- Node.js (version 21 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ricky-morty
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates production build
- `npm run preview` - Previews the production build
- `npm run lint` - Runs the linter

## 🏗️ Architecture and Technical Decisions

### Technology Stack

- **React** - Modern UI framework with hooks
- **TypeScript** - Static typing for robustness
- **Vite** - Fast and modern build tool
- **Material-UI** - Design system and components
- **React Router** - Client-side routing

### Application Characteristics

- Static SPA (no backend, no database)
- Direct consumption of the Rick and Morty public API
- Client-side state management and persistence
- Ready for static deployment

### Project Structure

```
src/
├── api/                   # API configuration and services
│   ├── character/         # Character endpoints and types
│   ├── location/          # Location endpoints and types
│   ├── episode/           # Episode endpoints and types
│   └── client.ts          # API client configuration
├── components/            # Reusable components
│   ├── character/        # Character-specific components
│   ├── common/           # Common components (Loading, ErrorMessage, Pagination)
│   └── layout/           # Application layout (Header, Footer)
├── hooks/                # Custom hooks
│   ├── useCharacters.ts  # Hook for character listing (API)
│   ├── useLocationCharacters.ts  # Hook for location characters
│   ├── useFavorites.ts   # Hook for favorites management
│   └── ...
├── pages/                # Main pages
│   ├── HomePage/
│   ├── CharactersPage/
│   └── CharacterDetailPage/
└── utils/                # Utilities, helpers and constants
    ├── constants.ts      # Application constants
    └── utils.ts # Character-related utilities
```

### Key Technical Decisions

#### 1. **Clean Code Principles**
- **DRY**: No logic repetition, clear helper functions
- **SOLID**: Components with single responsibility
- **Separation of Concerns**: Hooks separate logic from presentation
- **Composition**: Reusable and configurable components
- Small, focused functions with descriptive names
- Efficient filtering with optimized memoization

#### 2. **Custom Hooks for Reusable Logic**
- `useCharacters`: Fetch characters with API filters
- `useLocationCharacters`: Characters from a specific location
- `useFavorites`: Favorites management with localStorage + API fetch
- `useLocations`: Location listing
- `useCharacterDetail`: Character detail with episodes and location characters

#### 3. **Separation of Concerns**
- **API Layer**: Centralized in `api/` folder with dedicated services
- **Business Logic**: Encapsulated in custom hooks
- **Presentation**: Pure components focused on UI rendering
- **State Management**: Local state with clear separation between search filters and pagination

#### 4. **TypeScript for Type Safety**
- Interfaces for all entities (`Character`, `Location`, `Episode`)
- Strict typing in components and functions
- No implicit `any`
- Reusable types (`CharacterFilters` interface)

#### 5. **Hybrid Filtering Strategy**
The application implements a flexible filtering system that adapts based on the data source:

- **API Mode**: When browsing all characters without restrictions, uses server-side filtering and pagination through the Rick and Morty API for optimal performance
- **Location Mode**: When filtering by specific location, fetches all characters from that location and applies filters client-side
- **Favorites Mode**: Displays favorite characters with client-side filtering and pagination
- **Combined Modes**: Supports combining favorites with location filters (e.g., "show my favorite characters from Earth")

This hybrid approach balances API efficiency with flexible local filtering capabilities, ensuring fast initial loads while enabling rich filtering combinations.

#### 6. **Favorites Management**
- **localStorage persistence**: Character IDs are saved to browser's localStorage for permanent storage
- **Efficient storage**: Only IDs stored (not full objects) to minimize storage usage
- **Data fetching**: Full character data fetched via `characterApi.getMultiple()` on app load
- **Single source of truth**: One `favoriteCharacters` state with complete Character objects
- **Instant updates**: UI and localStorage sync immediately when toggling favorites 

#### 7. **Performance Optimizations**
- `useCallback` and `useMemo` applied where beneficial
- Debounced search inputs 
- Optimized filtering and pagination
- Extracted constants and reusable helpers
- Reduced unnecessary re-renders

## 📋 Features

- ✅ Character listing with server-side pagination
- ✅ Advanced filters: name, status, species, gender, and location
- ✅ Persistent favorites system (localStorage with instant sync)
- ✅ Combined filtering: favorites + location filters
- ✅ Character detail with episodes and related characters
- ✅ Character visualization by location
- ✅ Responsive navigation
- ✅ Loading states and error handling

## 🎨 UI/UX

- Responsive layout built with Material-UI
- Consistent component-based design system
- Clear navigation and interaction patterns
- Smooth hover and transition effects
- Visual feedback for loading, errors, and user actions

## 🚀 Future Improvements & Enhancements

### New Features
- **📅 Episode Timeline**: Interactive timeline showing character appearances across episodes with chronological visualization
- **🔍 Advanced Search**: Multi-criteria search with autocomplete and search history
- **📊 Character Statistics**: Visual charts showing character status distribution, species breakdown, etc.
- **🌍 Interactive Location Map**: Visual representation of locations with character distribution
- **🔔 Notifications**: Toast notifications for favorites actions and errors
- **🌙 Dark Mode**: Theme switcher with user preference persistence
- **🔄 Character Comparison**: Side-by-side comparison of multiple characters
- **🎭 Character Relationships**: Visual graph of character connections based on shared episodes/locations

### Requires backend (optional)
- **Authentication & User Profiles** OAuth, social login
- Sync favorites across devices via backend
- User profiles with custom lists (watchlist, favorite episodes)
- Comments and ratings on characters/episodes


### Technical Enhancements

- **Context API**: Global state management for favorites and theme
  - `FavoritesContext`: Share favorites across components without prop drilling
  - `ThemeContext`: Theme preferences and dark mode
  - `FilterContext`: Share filter state across pages
- **API error model**: Introduce a typed API error model (e.g. statusCode, message) for consistent error handling (404, 429, 500)
- **React Query / TanStack Query**: Data caching and background refetching
- **Code Splitting**: Route-based code splitting with React.lazy()
- **Virtual Scrolling**: For large character lists using react-window
- **Image Optimization**: Lazy loading and progressive images
- **Memoization** with useMemo and useCallback where beneficial

#### Testing
- **Unit Tests**: Vitest for hooks and utility functions
- **Component Tests**: React Testing Library for component behavior
- **E2E Tests**: Playwright or Cypress for critical user flows

#### Developer
- Error Boundaries for graceful runtime error handling
- Centralized handling of API errors and empty states
- Environment-based configuration (API base URL via environment variables)


#### Accessibility (a11y)
- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliance

#### API Enhancements
- **Request Cancellation**: AbortController for pending requests
- **Retry Logic**: Automatic retry with exponential backoff

### Architecture Improvements (Future)
- **Design System**: Shared component library with documentation
- **CI/CD**: Automated testing and deployment pipeline
- **Monitoring**: Error tracking (Sentry) and performance monitoring
- **Docker**: Setup for development and deployment (optional, mainly for future backend integration)

### Known Limitations
- No pagination controls shown when viewing favorites (intentional UX decision)
- No offline support yet (data requires API connection)
- Subject to public Rick and Morty API rate limits

```
