import React from 'react';
import { Dialog, Box, DialogProps } from '@material-ui/core';
import styled from 'styled-components';
import { Button } from '../Button';
import { Typography } from '../Typography';

import JoinImage from '../../assets/images/join.svg';
import CreateImage from '../../assets/images/create.svg';
import CompleteImage from '../../assets/images/complete.svg';

const ImageBox = styled(({ src, ...props }) => <Box {...props} />)`
  background-image: url(${({ src }) => src});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
`;

interface ModalProps extends DialogProps {
  image?: string;
  onShareButtonClick?: () => void;
  onBackButtonClick?: () => void;
}

interface JoinModalProps extends Omit<ModalProps, 'children'> {
  hashtag: string;
}

interface Modal extends React.FC<ModalProps> {
  Join: React.FC<JoinModalProps>;
  Create: React.FC<JoinModalProps>;
  Complete: React.FC<JoinModalProps>;
}

const Modal: Modal = ({ image, onShareButtonClick, onBackButtonClick, children, ...props }) => (
  <Dialog fullScreen {...props}>
    <Box display="flex" flexDirection="column" width="100%" height="100%" p={2} pb="8vh">
      <Box flexGrow="1" display="flex" flexDirection="column" justifyContent="center" alignItems="center" m={3}>
        <ImageBox height="40vh" mx={8} src={image} />
        <Box mt={4}>{children}</Box>
      </Box>
      <Box mt="10px">
        <Button color="primary" variant="contained" fullWidth onClick={onShareButtonClick}>
          Рассказать друзьям
        </Button>
      </Box>
      <Box mt="10px">
        <Button color="secondary" variant="contained" fullWidth onClick={onBackButtonClick}>
          Назад
        </Button>
      </Box>
    </Box>
  </Dialog>
);

Modal.Join = ({ hashtag, ...props }) => (
  <Modal image={JoinImage} {...props}>
    <Typography color="grays:1" fontSize="21px" fontWeight={500} align="center">
      <Typography display="block">Поздравляем!</Typography>
      <Typography display="block">Вы присоединились</Typography>
      <Typography display="block">к новому челленджу</Typography>
      <Typography display="block" color="blues:0">
        {hashtag}
      </Typography>
    </Typography>
  </Modal>
);

Modal.Create = ({ hashtag, ...props }) => (
  <Modal image={CreateImage} {...props}>
    <Typography color="grays:1" fontSize="21px" fontWeight={500} align="center">
      <Typography display="block">Ура! Поздравляем!</Typography>
      <Typography display="block">Вы создали новый челлендж</Typography>
      <Typography display="block" color="blues:0">
        {hashtag}
      </Typography>
    </Typography>
  </Modal>
);

Modal.Complete = ({ hashtag, ...props }) => (
  <Modal image={CompleteImage} {...props}>
    <Typography color="grays:1" fontSize="21px" fontWeight={500} align="center">
      <Typography display="block">Ура! Челлендж</Typography>
      <Typography display="block" color="blues:0">
        <Typography display="block">успешно пройден</Typography>
        {hashtag}
      </Typography>
    </Typography>
  </Modal>
);

export { Modal };
