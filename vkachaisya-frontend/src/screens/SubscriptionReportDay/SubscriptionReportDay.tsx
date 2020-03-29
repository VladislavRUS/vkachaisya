import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IApplicationState } from '../../store';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state: IApplicationState) => ({});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = StateProps & DispatchProps & RouteComponentProps;

const SubscriptionReportDay: React.FC<Props> = ({ match }) => {
  const { subscriptionId, reportDay } = match.params as any;

  console.log(subscriptionId, reportDay);

  return <h1>Report</h1>;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubscriptionReportDay));
