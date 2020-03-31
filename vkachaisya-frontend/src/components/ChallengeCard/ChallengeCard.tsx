import React from 'react';
import { Avatar } from '@material-ui/core';
import { Card } from '../Card';
import { Title, Description } from './ChallengeCard.styles';
import { Box, Typography } from '@material-ui/core';
import { Badge } from '../Badge';
import { SquareButton } from '../SquareButton';
import { AvatarGroup } from '@material-ui/lab';

interface ChallengeCardProps {
  title: string;
  description?: string;
  days: number;
  daysPassed?: number;
  hashtag: string;
  iconName: string;
  avatars: string[];
}

const ChallengeCard: React.FC<ChallengeCardProps> = (props) => (
  <Card>
    <Card>
      <Box pl={'20px'} pr={'20px'} pt={'22px'} pb={'25px'}>
        <Box display="flex" justifyContent="space-between">
          <Title>{props.title}</Title>
          <Box ml={1} />
          <SquareButton iconName={props.iconName} iconRotate="180deg" />
        </Box>
        {props.description && <Description>{props.description}</Description>}
        {props.daysPassed && (
          <Box>
            {props.daysPassed} из {props.days}
          </Box>
        )}
        <Box display="flex" alignItems="center" mt={2}>
          <AvatarGroup>
            {[...props.avatars, ...props.avatars, ...props.avatars].map((avatar, i) => (
              <Avatar key={i} src={avatar} />
            ))}
          </AvatarGroup>
          <Box ml={1} />
          <Typography>+ 100 участников</Typography>
        </Box>
        <Box display="flex" mt={2}>
          <Badge text={`${props.days} дней`} bgColor={'#56cc95'} color={'#fff'} />
          <Box mr={1} />
          <Badge text={props.hashtag} bgColor={'#f7f9fb'} color={'#9ea9b1'} />
        </Box>
      </Box>
    </Card>
  </Card>
);

export { ChallengeCard };
