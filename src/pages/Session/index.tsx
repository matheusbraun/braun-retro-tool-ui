import React, { memo } from 'react';

import Timer from '../../components/Timer';

import './styles.css';

const Session: React.FC = () => {
  return (
    <div className="session-header">
      <Timer />
    </div>
  );
};

export default memo(Session);
