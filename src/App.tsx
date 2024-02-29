import './App.css';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { ROUTES } from './constants';

export const App = () => {
  return (
    <div className="App container">
      <header className="header">
        <h3 className="title">Service for work with Valantis API</h3>
      </header>

      <Router>
        <Routes>
          <Route
            path={ROUTES.empty}
            element={<Navigate to={ROUTES.home} replace={true} />}
          />
          <Route
            path={ROUTES.start}
            element={<Navigate to={ROUTES.home} replace={true} />}
          />
          <Route path={ROUTES.home} element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};
