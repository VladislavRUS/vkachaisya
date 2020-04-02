import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps, generatePath } from 'react-router-dom';
import { IApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppBar } from '../../components/AppBar';
import { Box, Typography } from '@material-ui/core';
import { BackLink } from '../../components/BackLink';
import { Routes } from '../../entry/Routes';
import { selectIsFetchingReports, selectReportByDay, selectReports } from '../../store/reports/selectors';
import { EditReport } from './EditReport';
import { RoundButton } from '../../components/RoundButton';
import { Icon } from '../../components/Icon';
import { clearReports, createReport, getReports, setEditReport, updateReport } from '../../store/reports/actions';
import { getSubscriptionResult, getSubscriptions } from '../../store/subscriptions/actions';
import { ViewReport } from './ViewReport';
import {
  selectIsFetchingSubscriptions,
  selectSubscriptionResult,
  selectSubscriptions,
} from '../../store/subscriptions/selectors';
import { selectCurrentUser } from '../../store/user/selectors';

const mapStateToProps = (state: IApplicationState, routeProps: RouteComponentProps) => ({
  reports: selectReports(state),
  report: selectReportByDay(state, +(routeProps.match.params as any).reportDay),
  isFetchingReports: selectIsFetchingReports(state),
  subscriptions: selectSubscriptions(state),
  user: selectCurrentUser(state),
  isFetchingSubscriptions: selectIsFetchingSubscriptions(state),
  subscriptionResult: selectSubscriptionResult(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getReports,
      setEditReport,
      createReport,
      clearReports,
      updateReport,
      getSubscriptions,
      getSubscriptionResult,
    },
    dispatch,
  );
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps & RouteComponentProps;

const ViewHeader = ({ to, title, onEdit, canEdit }: any) => (
  <AppBar
    left={<BackLink to={to} />}
    center={title}
    right={
      canEdit && (
        <RoundButton onClick={onEdit} buttonColor={'transparent'}>
          <Icon name={'pencil'} size={50} color={'#818c99'} />
        </RoundButton>
      )
    }
  />
);

const EditHeader = ({ onCancel, onSave, title }: any) => (
  <AppBar
    isTransparent={true}
    left={
      <RoundButton onClick={onCancel}>
        <Icon name={'close'} size={10} color={'#818c99'} />
      </RoundButton>
    }
    center={title}
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
  isFetchingReports,
  clearReports,
  updateReport,
  subscriptions,
  getSubscriptions,
  isFetchingSubscriptions,
  subscriptionResult,
  getSubscriptionResult,
  user,
}) => {
  const { subscriptionId, reportDay, userId } = match.params as any;

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (reports.length === 0) {
      getReports(subscriptionId);
    }

    if (subscriptions.length === 0) {
      getSubscriptions();
    }

    if (!subscriptionResult) {
      getSubscriptionResult(userId, subscriptionId);
    }

    return () => {
      clearReports();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (report) {
      setEditReport(report);
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  }, [report, setEditReport]);

  const getTitle = () => {
    if (editMode && report) {
      return 'Редактирование отчета';
    } else if (editMode && !report) {
      return 'Добавление отчета';
    } else if (report) {
      return `День ${report.day}`;
    }
  };

  const subscription = subscriptions.find(({ id }) => id === +subscriptionId);

  const subscriptionsLink = generatePath(Routes.SUBSCRIPTION, { subscriptionId, userId });

  const onCancel = () => {
    if (!report) {
      history.replace(subscriptionsLink);
    } else {
      setEditMode(false);
    }
  };

  const onEdit = () => {
    if (report) {
      setEditReport(report);
      setEditMode(true);
    }
  };

  const onSave = () => {
    if (!report) {
      createReport(+reportDay, subscriptionId);
    } else {
      updateReport(report.id);
    }
  };

  if (isFetchingReports) {
    return null;
  }

  const canEdit =
    isFetchingSubscriptions || !subscriptionResult || !user
      ? false
      : !!subscriptions.find(
          (subscription) =>
            subscription.challengeId === subscriptionResult.challenge.id &&
            subscription.id === parseInt(subscriptionId),
        ) && user.id === parseInt(userId);

  if (editMode && !canEdit && subscriptionResult) {
    history.goBack();
  }

  return (
    <Box display={'flex'} flexDirection={'column'} width={'100%'} height={'100%'} overflow={'hidden'}>
      {editMode ? (
        <EditHeader onCancel={onCancel} title={getTitle()} onSave={onSave} />
      ) : (
        <ViewHeader to={subscriptionsLink} title={getTitle()} onEdit={onEdit} canEdit={canEdit} />
      )}

      {editMode && <EditReport day={reportDay} onSubmit={onSave} />}
      {!editMode && report && (
        <ViewReport
          start={subscription ? new Date(subscription.startDate).toString() : null}
          report={report}
          onEdit={onEdit}
          canEdit={canEdit}
        />
      )}
    </Box>
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubscriptionReportDay));
