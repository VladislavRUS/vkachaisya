import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { Box, Typography } from '@material-ui/core';

const Dots = styled(MobileStepper)`
  display: flex;
  justify-content: center;
  background-color: transparent;

  .MuiMobileStepper-dot {
    width: 7px;
    height: 7px;
    margin: 0 5px;
  }
`;

interface Step {
  img: string;
  imgWidth?: number;
  imgHeight?: number;
  text: string[];
}

interface CarouselProps {
  steps: Step[];
  step: number;
  setStep: (step: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ steps, step, setStep }) => {
  const theme = useTheme();

  const handleStepChange = (step: number) => {
    setStep(step);
  };

  return (
    <Box>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={step}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {steps.map(({ text, img, imgWidth, imgHeight }, index) => (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            py="4vh"
            justifyContent="center"
            key={index}
          >
            <Box display="flex" alignItems="center" justifyContent="center" width="250px" height="300px">
              <img src={img} alt={text.join(' ')} width={imgWidth} height={imgHeight} />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              {text.map((str, i) => (
                <Typography key={i} variant="h2">
                  {str}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </SwipeableViews>
      <Dots
        steps={steps.length}
        position="static"
        variant="dots"
        activeStep={step}
        nextButton={null}
        backButton={null}
      />
    </Box>
  );
};

export { Carousel };
