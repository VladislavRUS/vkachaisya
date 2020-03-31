import React from 'react';
import { IReport } from '../../../types/index';
import { Wrapper, TextArea, Bottom } from './EditReport.styles';
import { IconButton } from '@material-ui/core';
import { Icon } from '../../../components/Icon';
import { IApplicationState } from '../../../store';
import { selectEditReport } from '../../../store/reports/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { setEditReport } from '../../../store/reports/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state: IApplicationState) => ({
  editReport: selectEditReport(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setEditReport,
    },
    dispatch,
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type OwnProps = {
  day: string;
  report?: IReport;
};

type Props = OwnProps & StateProps & DispatchProps;

const EditReport: React.FC<Props> = ({ editReport, setEditReport }) => {
  const onTextChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const newReport = { ...editReport, text: event.currentTarget.value };
    setEditReport(newReport);
  };

  const ref = React.createRef<HTMLInputElement>();

  const onImageSelect = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const onImageChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length) {
      alert(event.currentTarget.files[0].name);
    }
  };

  return (
    <Wrapper>
      <TextArea placeholder={'Поделитесь впечатлениями'} value={editReport.text} onChange={onTextChange} />
      <Bottom>
        <input
          type={'file'}
          ref={ref}
          accept={'image'}
          style={{ opacity: 0, width: 0, height: 0 }}
          onChange={onImageChange}
        />
        <IconButton onClick={onImageSelect}>
          <Icon name={'image'} size={20} />
        </IconButton>

        <IconButton>
          <Icon name={'video'} size={22} />
        </IconButton>
      </Bottom>
    </Wrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReport);
