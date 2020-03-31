import styled from 'styled-components';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

const StyledExpansionPanel = styled(ExpansionPanel)`
  &.MuiExpansionPanel-root.Mui-expanded {
    margin: 0;
  }

  &.MuiPaper-elevation1 {
    box-shadow: none;
  }
  &.MuiPaper-root {
    background-color: transparent;
  }
  .MuiExpansionPanelSummary-content.Mui-expanded {
    margin: 12px 0;
  }
`;

const StyledExpansionPanelSummary = styled(ExpansionPanelSummary)`
  &.MuiExpansionPanelSummary-root,
  &.MuiExpansionPanelSummary-root.Mui-expanded {
    justify-content: flex-start;
    align-items: center;
    min-height: auto;
  }
  .MuiExpansionPanelSummary-content {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 16px;
    font-weight: 700;
    flex-grow: 0;
  }
`;

const StyledExpansionPanelDetails = styled(ExpansionPanelDetails)`
  flex-direction: column;
`;

export { StyledExpansionPanel, StyledExpansionPanelSummary, StyledExpansionPanelDetails };
