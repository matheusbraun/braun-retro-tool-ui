import { faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

// import logo from '../../assets/images/iconfinder_dragon_64px.png';
import { useAuth } from '../../hooks/useAuth';

import './styles.css';

const Header = () => {
  const authContext = useAuth();

  const history = useHistory();

  const handleLogoutClick = () => {
    authContext?.removeIsAuthenticated();
    history.push('/login');
  };

  const handleLogoClick = () => {
    if (authContext?.isAuthenticated) history.push('/');
  };

  return (
    <div className="topnav">
      <div className="logo">
        <FontAwesomeIcon icon={faTools} onClick={handleLogoClick} />
        <span>Braun Retro Tool</span>
      </div>
      {authContext?.isAuthenticated && (
        <button onClick={handleLogoutClick}>Sign Out</button>
      )}
    </div>
  );
};

export default memo(Header);
