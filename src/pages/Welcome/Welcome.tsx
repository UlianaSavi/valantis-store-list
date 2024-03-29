import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import { ROUTES } from '../../constants';

// It was a welcome page, but HR asked to remove it - so it's not used, but can be returned.
export const Welcome = () => {
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate(ROUTES.home);
  };

  return (
    <div className="welcome">
      <h2>Welcome!</h2>
      <p>For start work with application click the button under:</p>
      <button className="btn" onClick={goToHomePage}>
        Start
      </button>
    </div>
  );
};
