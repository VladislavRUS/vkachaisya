import React from 'react';
import { Wrapper, Description } from './ViewReport.styles';
import { IReport } from '../../../types/index';
import { FloatButton } from '../../../components/FloatButton';

type Props = {
  report: IReport;
  onEdit?: () => void;
};

const ViewReport: React.FC<Props> = ({ report, onEdit }) => {
  return (
    <Wrapper>
      <Description>{report.text}</Description>
      {report.files.map((file) => file.type === 'image' && <img src={file.path} />)}
      <FloatButton iconName="pencil" onClick={onEdit} />
    </Wrapper>
  );
};

export default ViewReport;
