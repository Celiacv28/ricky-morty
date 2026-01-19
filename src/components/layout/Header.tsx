import './Header.css';
import { APP_TITLE } from '../../utils/constants';

export const Header = () => {
  return (
    <header className="header">
        <div>
          <h1>{APP_TITLE}</h1>
        </div>
    </header>
  );
};