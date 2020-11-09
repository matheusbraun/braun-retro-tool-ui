import React, { memo, useState } from 'react';

import Panel, { PanelType } from '../../components/Panel';
import Timer from '../../components/Timer';

import './styles.css';

const Session: React.FC = () => {
  const [goodData, setGoodData] = useState<Array<string>>([]);
  const [wonderingData, setWonderingData] = useState<Array<string>>([]);
  const [badData, setBadData] = useState<Array<string>>([]);

  const handleSubmit = (type: PanelType, value: string) => {
    switch (type) {
      case 'good':
        setGoodData(goodData => [value, ...goodData]);
        break;
      case 'wondering':
        setWonderingData(wonderingData => [value, ...wonderingData]);
        break;
      case 'bad':
        setBadData(badData => [value, ...badData]);
        break;
    }
  };

  const handleRemove = (type: PanelType, id: number) => {
    switch (type) {
      case 'good':
        setGoodData(goodData => {
          goodData.splice(id, 1);
          return [...goodData];
        });
        break;
      case 'wondering':
        setWonderingData(wonderingData => {
          wonderingData.splice(id, 1);
          return [...wonderingData];
        });
        break;
      case 'bad':
        setBadData(badData => {
          badData.splice(id, 1);
          return [...badData];
        });
        break;
    }
  };

  return (
    <div className="session">
      <div className="session-header">
        <Timer />
      </div>
      <div className="divider" />
      <div className="session-panels">
        <Panel
          type="good"
          onSubmit={(value: string) => handleSubmit('good', value)}
          onRemove={(id: number) => handleRemove('good', id)}
          panelItems={goodData}
        />
        <Panel
          type="wondering"
          onSubmit={(value: string) => handleSubmit('wondering', value)}
          onRemove={(id: number) => handleRemove('wondering', id)}
          panelItems={wonderingData}
        />
        <Panel
          type="bad"
          onSubmit={(value: string) => handleSubmit('bad', value)}
          onRemove={(id: number) => handleRemove('bad', id)}
          panelItems={badData}
        />
      </div>
    </div>
  );
};

export default memo(Session);
