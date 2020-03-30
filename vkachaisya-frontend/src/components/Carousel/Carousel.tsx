import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { Box } from '@material-ui/core';

const Dots = styled(MobileStepper)`
  display: flex;
  justify-content: center;
  background-color: transparent;
`;

interface Step {
  img: string;
  text: string;
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
        {steps.map(({ text, img }, index) => (
          <Box display="flex" width="100%" py={8} justifyContent="center" key={index}>
            {Math.abs(step - index) <= 2 ? <img src={img} alt={text} /> : null}
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
