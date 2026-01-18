import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './HomePage.css';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleAccess = () => {
    navigate('/characters');
  };
  
  return (
    <div className="home-page">
      <div className="home-page__container">
        <h1>Bienvenido al Portal</h1>
        <p>Explora el universo de Rick and Morty. Descubre todos los personajes</p>
        <div>
          <Button            
            size="large"
            onClick={handleAccess}
            sx={{
              mt: 3,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '12px',             
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#2c3e50',
            }}
          >
            Acceder
          </Button>
        </div>
      </div>
    </div>
  );
};