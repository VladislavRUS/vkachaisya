import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps, generatePath } from 'react-router-dom';
import { IApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppBar } from '../../components/AppBar';
import { Box, Typography } from '@material-ui/core';
import { BackLink } from '../../components/BackLink';
import { Routes } from '../../entry/Routes';
import { selectReportByDay, selectReports } from '../../store/reports/selectors';
import { EditReport } from './EditReport';
import { RoundButton } from '../../components/RoundButton';
import { Icon } from '../../components/Icon';
import { createReport, getReports, setEditReport } from '../../store/reports/actions';

const mapStateToProps = (state: IApplicationState, routeProps: RouteComponentProps) => ({
  reports: selectReports(state),
  report: selectReportByDay(state, (routeProps.match.params as any).day),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getReports,
      setEditReport,
      createReport,
    },
    dispatch,
  );
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps & RouteComponentProps;

const ViewHeader = ({ to, title }: any) => (
  <AppBar.Small
    left={<BackLink to={to} />}
    center={
      <Typography variant="h1" noWrap={true}>
        {title}
      </Typography>
    }
  />
);

const EditHeader = ({ onCancel, onSave, title }: any) => (
  <AppBar.Small
    isTransparent={true}
    left={
      <RoundButton onClick={onCancel}>
        <Icon name={'close'} size={10} color={'#818c99'} />
      </RoundButton>
    }
    center={
      <Typography variant="h1" noWrap={true}>
        {title}
      </Typography>
    }
    right={
      <RoundButton onClick={onSave}>
        <Icon name={'arrowUp'} size={34} color={'#e3e3e3'} />
      </RoundButton>
    }
  />
);

const SubscriptionReportDay: React.FC<Props> = ({
  match,
  report,
  history,
  reports,
  getReports,
  setEditReport,
  createReport,
}) => {
  const { subscriptionId, reportDay, userId } = match.params as any;

  useEffect(() => {
    if (reports.length === 0) {
      getReports(userId, subscriptionId);
    }

    if (report) {
      setEditReport(report);
    }
  }, [getReports, report, reports.length, setEditReport, subscriptionId, userId]);

  const [editMode, setEditMode] = useState(!Boolean(report));

  const getTitle = () => {
    if (editMode && report) {
      return 'Редактирование отчета';
    } else if (!editMode && !report) {
      return 'Добавление отчета';
    } else if (report) {
      return `День ${report.day}`;
    }
  };

  const subscriptionsLink = generatePath(Routes.SUBSCRIPTION, { subscriptionId, userId });

  const onCancel = () => {
    if (!report) {
      history.replace(subscriptionsLink);
    } else {
      setEditMode(false);
    }
  };

  const onSave = () => {
    if (!report) {
      createReport(subscriptionId);
    } else {
    }
  };

  return (
    <Box display={'flex'} flexDirection={'column'} width={'100%'} height={'100%'} overflow={'hidden'}>
      {editMode ? (
        <EditHeader onCancel={onCancel} title={getTitle()} onSave={onSave} />
      ) : (
        <ViewHeader to={subscriptionsLink} title={getTitle()} />
      )}

      {editMode ? <EditReport day={reportDay} /> : null}
    </Box>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubscriptionReportDay));
