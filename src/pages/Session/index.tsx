import React, { memo } from 'react';

import Panel from '../../components/Panel';
import Timer from '../../components/Timer';

import './styles.css';

const Session: React.FC = () => {
  return (
    <div className="session">
      <div className="session-header">
        <Timer />
      </div>
      <div className="divider" />
      <div className="session-panels">
        <Panel type="good" />
        <Panel type="wondering" />
        <Panel type="bad" />
      </div>
    </div>
  );
};

export default memo(Session);
