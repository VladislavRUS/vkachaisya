import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { RoundButton } from '../RoundButton';
import { Icon } from '../Icon';
import bridge from '@vkontakte/vk-bridge';

const ImageGrid: React.FC<any> = ({ files, size, editMode = false, onDelete }) => {
  const onViewImage = (path: string) => {
    bridge.send('VKWebAppShowImages', {
      images: [path],
    });
  };

  return (
    <Grid container spacing={1}>
      {(files as any[]).map(
        (file: any, i: number) =>
          file.type === 'image' && (
            <Grid item key={i} xs={3}>
              <Box position="relative">
                <Box
                  onClick={() => onViewImage(file.path)}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundImage: `url(${file.path})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                  }}
                />
                {editMode && (
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    style={{ transform: 'translate(-25%,-25%)' }}
                    onClick={() => onDelete(file)}
                  >
                    <RoundButton>
                      <Icon name={'close'} size={10} color={'#818c99'} />
                    </RoundButton>
                  </Box>
                )}
              </Box>
            </Grid>
          ),
      )}
    </Grid>
  );
};

export { ImageGrid };
