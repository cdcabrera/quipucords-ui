import React from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertActionCloseButton, AlertGroup } from '@patternfly/react-core';
import { connect, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';

class ToastNotificationsList extends React.Component {
  onHover = () => {
    store.dispatch({ type: reduxTypes.toastNotifications.TOAST_PAUSE });
  };

  onLeave = () => {
    store.dispatch({ type: reduxTypes.toastNotifications.TOAST_RESUME });
  };

  onDismiss = toast => {
    store.dispatch({
      type: reduxTypes.toastNotifications.TOAST_REMOVE,
      toast
    });
  };

  onTimeout = () => {
    store.dispatch({ type: reduxTypes.toastNotifications.TOAST_CLEAR });
  };

  render() {
    const { toasts, timeout } = this.props;

    return (
      <AlertGroup isToast className="quipucords-toast-notifications__alert-group">
        {toasts &&
          toasts.map(toast => {
            if (!toast.removed) {
              return (
                <Alert
                  title={toast.header ?? toast.message}
                  timeout={timeout}
                  onTimeout={this.onTimeout}
                  variant={toast.alertType}
                  actionClose={<AlertActionCloseButton onClose={() => this.onDismiss(toast)} />}
                  key={helpers.generateId('key')}
                  onMouseEnter={this.onHover}
                  onMouseLeave={this.onLeave}
                >
                  {toast.header && toast.message ? toast.message : ''}
                </Alert>
              );
            }
            return null;
          })}
      </AlertGroup>
    );
  }
}

ToastNotificationsList.propTypes = {
  toasts: PropTypes.array,
  timeout: PropTypes.number
};

ToastNotificationsList.defaultProps = {
  toasts: [],
  timeout: 8000
};

const mapStateToProps = state => ({ ...state.toastNotifications });

const ConnectedToastNotificationsList = connect(mapStateToProps)(ToastNotificationsList);

export { ConnectedToastNotificationsList as default, ConnectedToastNotificationsList, ToastNotificationsList };
