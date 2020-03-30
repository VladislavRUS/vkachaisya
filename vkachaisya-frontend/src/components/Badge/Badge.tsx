import React from 'react';

import { Wrapper, Text } from './Badge.styles';

type Props = {
  text: string;
  color?: string;
  bgColor?: string;
};

const Badge: React.FC<Props> = ({ text, color = '#fff', bgColor = '#000' }) => (
  <Wrapper bgColor={bgColor}>
    <Text color={color}>{text}</Text>
  </Wrapper>
);

export default Badge;
