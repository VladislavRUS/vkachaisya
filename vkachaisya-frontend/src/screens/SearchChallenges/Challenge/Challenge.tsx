import React from 'react';
import { Wrapper, Header, Title, Description, Badges } from './Challenge.styles';
import { ISearchChallenge } from '../../../types/index';
import { Badge } from '../../../components/Badge';
import { Box, Avatar } from '@material-ui/core';
import { SquareButton } from '../../../components/SquareButton';
import { Card } from '../../../components/Card';

type Props = {
  searchChallenge: ISearchChallenge;
};

const Challenge: React.FC<Props> = ({ searchChallenge }) => (
  <Wrapper>
    <Card>
      <Box pl={'20px'} pr={'20px'} pt={'22px'} pb={'25px'}>
        <Header>
          <Title>{searchChallenge.challenge.title}</Title>
          <SquareButton iconName={'arrow'} iconRotate="180deg" />
        </Header>
        <Description>{searchChallenge.challenge.description}</Description>
        {searchChallenge.avatars.map((avatar, i) => (
          <Avatar key={i} src={avatar} />
        ))}
        <Badges>
          <Badge text={`${searchChallenge.challenge.days} дней`} bgColor={'#56cc95'} color={'#fff'} />
          <Box mr={1} />
          <Badge text={`#ВКачайся${searchChallenge.challenge.title}`} bgColor={'#f7f9fb'} color={'#9ea9b1'} />
        </Badges>
      </Box>
    </Card>
  </Wrapper>
);

export default Challenge;
