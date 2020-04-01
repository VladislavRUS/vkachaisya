import React from 'react';
import { IFile, IReport } from '../../../types/index';
import { Wrapper, TextArea, Bottom, FileInput } from './EditReport.styles';
import { Box, IconButton } from '@material-ui/core';
import { Icon } from '../../../components/Icon';
import { IApplicationState } from '../../../store';
import { selectEditReport } from '../../../store/reports/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { attachFile, setEditReport } from '../../../store/reports/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state: IApplicationState) => ({
  editReport: selectEditReport(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setEditReport,
      attachFile,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type OwnProps = {
  day: string;
  report?: IReport;
};

type Props = OwnProps & StateProps & DispatchProps;

const EditReport: React.FC<Props> = ({ editReport, setEditReport, attachFile }) => {
  const onTextChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const newReport = { ...editReport, text: event.currentTarget.value };
    setEditReport(newReport);
  };

  const imageInputRef = React.createRef<HTMLInputElement>();

  const onImageSelect = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const onImageChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length) {
      attachFile(event.currentTarget.files[0], 'image');
    }
  };

  const videoInputRef = React.createRef<HTMLInputElement>();

  const onVideoSelect = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  const onVideoChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length) {
      attachFile(event.currentTarget.files[0], 'video');
    }
  };

  const onFileDelete = (fileToDelete: IFile) => {
    const updatedEditReport = { ...editReport, files: editReport.files.filter((file) => file.id !== fileToDelete.id) };
    setEditReport(updatedEditReport);
  };

  return (
    <Wrapper>
      <TextArea placeholder={'Поделитесь впечатлениями'} value={editReport.text} onChange={onTextChange} />

      <Box>
        {editReport.files.map((file) => (
          <Box>
            {file.type === 'image' ? (
              <img src={file.path} onClick={() => onFileDelete(file)} />
            ) : (
              <Box onClick={() => onFileDelete(file)}>{file.type}</Box>
            )}
          </Box>
        ))}
      </Box>

      <Bottom>
        <FileInput ref={imageInputRef} accept={'image'} onChange={onImageChange} />
        <IconButton onClick={onImageSelect}>
          <Icon name={'image'} size={20} />
        </IconButton>

        <FileInput ref={videoInputRef} accept={'image'} onChange={onVideoChange} />

        <IconButton onClick={onVideoSelect}>
          <Icon name={'video'} size={22} />
        </IconButton>
      </Bottom>
    </Wrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReport);
