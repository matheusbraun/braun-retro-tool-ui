import React from 'react';

import { PanelType } from '..';
import GoodLogo from '../../../assets/images/iconfinder_good.svg';
import BadLogo from '../../../assets/images/iconfinder_bad.svg';
import Wondering from '../../../assets/images/iconfinder_wondering.svg';

type Props = {
  type: PanelType;
};

const HeaderImage = ({ type }: Props) => {
  if (type === 'good') return <img src={GoodLogo} alt="Good panel icon" />;

  if (type === 'bad') return <img src={BadLogo} alt="Bad panel icon" />;

  return <img src={Wondering} alt="Wondering panel icon" />;
};

export default HeaderImage;
