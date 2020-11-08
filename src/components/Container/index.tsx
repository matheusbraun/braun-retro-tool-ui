import React, { memo } from 'react';

import './styles.css';

type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => (
  <div className="container">{children}</div>
);

export default memo(Container);
