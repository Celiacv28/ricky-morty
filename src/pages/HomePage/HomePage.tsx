import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './HomePage.css';
import { HOME_TITLE, HOME_SUBTITLE, BTN_ACCESS } from '../../utils/constants';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleAccess = () => {
    navigate('/characters');
  };
  
  return (
    <div className="home-page">
      <div className="home-page__container">
        <h1>{HOME_TITLE}</h1>
        <p>{HOME_SUBTITLE}</p>
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
            {BTN_ACCESS}
          </Button>
        </div>
      </div>
    </div>
  );
};