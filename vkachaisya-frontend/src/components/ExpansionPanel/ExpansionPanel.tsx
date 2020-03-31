import React from 'react';
import { ExpansionPanelProps, ExpansionPanelSummaryProps, ExpansionPanelDetailsProps } from '@material-ui/core';
import {
  StyledExpansionPanel,
  StyledExpansionPanelSummary,
  StyledExpansionPanelDetails,
} from './ExpansionPanel.styles';
import { Icon } from '../Icon';

const ExpansionPanel: React.FC<ExpansionPanelProps> = (props) => <StyledExpansionPanel {...props} />;

const ExpansionPanelSummary: React.FC<ExpansionPanelSummaryProps> = (props) => (
  <StyledExpansionPanelSummary {...props} expandIcon={<Icon name="arrow" size={10} rotate="90deg" />}>
    {props.children}
  </StyledExpansionPanelSummary>
);

const ExpansionPanelDetails: React.FC<ExpansionPanelDetailsProps> = (props) => (
  <StyledExpansionPanelDetails {...props} />
);

export { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails };
