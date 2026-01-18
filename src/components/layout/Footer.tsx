import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
        <p className="footer__text">
          Datos proporcionados por{' '}
          <a 
            href="https://rickandmortyapi.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer__link"
          >
            The Rick and Morty API
          </a>
        </p>
        <p className="footer__text">
          &copy; {new Date().getFullYear()} Rick and Morty Portal
        </p>
    </footer>
  );
};