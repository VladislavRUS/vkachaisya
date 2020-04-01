import React from 'react';
import { Wrapper, Description } from './ViewReport.styles';
import { IReport } from '../../../types/index';

type Props = {
  report: IReport;
};

const ViewReport: React.FC<Props> = ({ report }) => {
  return (
    <Wrapper>
      <Description>{report.text}</Description>
      {report.files.map((file) => file.type === 'image' && <img src={file.path} />)}
    </Wrapper>
  );
};

export default ViewReport;
