import React from 'react';
import { Wrapper, Header, Title, Description, Badges } from './Challenge.styles';
import { IChallenge } from '../../../types/index';
import { Badge } from '../../../components/Badge';
import { Box } from '@material-ui/core';
import { SquareButton } from '../../../components/SquareButton';
import { Card } from '../../../components/Card';

type Props = {
  challenge: IChallenge;
};

const Challenge: React.FC<Props> = ({ challenge }) => (
  <Wrapper>
    <Card>
      <Box pl={'20px'} pr={'20px'} pt={'22px'} pb={'25px'}>
        <Header>
          <Title>{challenge.title}</Title>
          <SquareButton iconName={'arrow'} />
        </Header>
        <Description>{challenge.description}</Description>
        <Badges>
          <Badge text={`${challenge.days} дней`} bgColor={'#56cc95'} color={'#fff'} />
          <Box mr={1} />
          <Badge text={`#ВКачайся${challenge.title}`} bgColor={'#f7f9fb'} color={'#9ea9b1'} />
        </Badges>
      </Box>
    </Card>
  </Wrapper>
);

export default Challenge;
