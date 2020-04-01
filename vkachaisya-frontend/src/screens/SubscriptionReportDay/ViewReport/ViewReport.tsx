import React from 'react';
import { Wrapper, Description } from './ViewReport.styles';
import { IReport } from '../../../types/index';
import { FloatButton } from '../../../components/FloatButton';
import { Box, Grid } from '@material-ui/core';
import { Typography } from '../../../components/Typography';
import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ImageGrid } from '../../../components/ImageGrid';

type Props = {
  report: IReport;
  start: string | null;
  onEdit?: () => void;
};

const ViewReport: React.FC<Props> = ({ report, start, onEdit }) => {
  return (
    <Wrapper>
      <Box my="30px" mx={2}>
        {start && (
          <>
            <Typography fontSize="12px" fontWeight={400} color="#6a7b89">
              {format(addDays(new Date(start), report.day - 1), 'dd MMMM yyyy', { locale: ru })}
            </Typography>
            <Box height="8px" />
          </>
        )}
        <Description>{report.text}</Description>
        <Box mt="24px">
          <ImageGrid files={report.files} size={110} />
        </Box>
        <FloatButton iconName="pencil" onClick={onEdit} />
      </Box>
    </Wrapper>
  );
};

export default ViewReport;
