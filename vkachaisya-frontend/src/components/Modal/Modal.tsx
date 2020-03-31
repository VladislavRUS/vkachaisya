import React from 'react';
import { Dialog, Box, DialogProps } from '@material-ui/core';
import styled from 'styled-components';
import { Button } from '../Button';

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

const Modal: React.FC<ModalProps> = ({ image, onShareButtonClick, onBackButtonClick, children, ...props }) => (
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

export { Modal };
