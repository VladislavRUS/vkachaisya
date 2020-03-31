import React from 'react';
import { Avatar } from '@material-ui/core';
import { Card } from '../Card';
import { Title, Description } from './ChallengeCard.styles';
import { Box } from '@material-ui/core';
import { Badge } from '../Badge';
import { SquareButton } from '../SquareButton';
import { AvatarGroup } from '@material-ui/lab';
import { Typography } from '../Typography';
import { LinearProgress } from '../LinearProgress';

interface ChallengeCardProps {
  title: string;
  description?: string;
  days: number;
  showProgress?: number;
  daysPassed?: number;
  hashtag: string;
  iconName: string;
  avatars: string[];
}

const ChallengeCard: React.FC<ChallengeCardProps> = (props) => (
  <Card>
    <Card>
      <Box pl={'20px'} pr={'20px'} pt={'22px'} pb={'25px'}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Title>{props.title}</Title>
          <Box ml={1} />
          <SquareButton iconName={props.iconName} iconRotate="180deg" />
        </Box>
        {props.description && <Description>{props.description}</Description>}
        {props.daysPassed !== undefined && (
          <Box display="flex" alignItems="center" mt={1.5}>
            <Box flexGrow={1}>
              <LinearProgress value={(props.daysPassed / props.days) * 100} />
            </Box>
            <Box flexShrink={0} ml={1}>
              <Typography fontSize="12px" fontWeight={600} color="grays:1">
                {props.daysPassed} из {props.days}{' '}
              </Typography>
              <Typography fontSize="12px" fontWeight={300} color="grays:2">
                дней
              </Typography>
            </Box>
          </Box>
        )}
        <Box display="flex" alignItems="center" my={1.5}>
          <AvatarGroup>
            {props.avatars.slice(0, 3).map((avatar, i) => (
              <Avatar key={i} src={avatar} />
            ))}
          </AvatarGroup>
          <Box ml={1} />
          <Typography color="grays:2" fontSize="12px" fontWeight={400}>
            + 100 участников
          </Typography>
        </Box>
        <Box display="flex">
          <Badge text={`${props.days} дней`} bgColor={'#56cc95'} color={'#fff'} />
          <Box mr={1} />
          <Badge text={props.hashtag} bgColor={'#f7f9fb'} color={'#9ea9b1'} />
        </Box>
      </Box>
    </Card>
  </Card>
);

export { ChallengeCard };
