import React from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertActionCloseButton, AlertGroup, AlertVariant } from '@patternfly/react-core';
import { connect, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';

/**
 * Generate a toast notifications list.
 * Operates by allowing mutation of the passed/original toast object from state.
 */
class ToastNotificationsList extends React.Component {
  onHover = toast => {
    store.dispatch({
      type: reduxTypes.toastNotifications.TOAST_PAUSE,
      toast
    });
  };

  onLeave = toast => {
    store.dispatch({
      type: reduxTypes.toastNotifications.TOAST_RESUME,
      toast
    });
  };

  onDismiss = toast => {
    store.dispatch({
      type: reduxTypes.toastNotifications.TOAST_REMOVE,
      toast
    });
  };

  render() {
    const { toasts, timeout } = this.props;

    return (
      <AlertGroup isToast isLiveRegion className="quipucords-toast-notifications__alert-group">
        {toasts?.map(toast => {
          const { alertType, header, message, removed, paused, persistent } = toast;

          if (!removed) {
            const updatedTitle = header || message;
            const updatedMessage = (header && message) || '';
            const updatedTimeout = !persistent && !paused && timeout;
            const onTimeoutClose = () => this.onDismiss(toast);
            const onMouseEnter = () => this.onHover(toast);
            const onMouseLeave = () => this.onLeave(toast);

            return (
              <Alert
                key={helpers.generateId('toast')}
                timeout={updatedTimeout}
                variant={alertType}
                actionClose={<AlertActionCloseButton onClose={onTimeoutClose} />}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onTimeout={onTimeoutClose}
                title={updatedTitle}
                truncateTitle={2}
              >
                {updatedMessage}
              </Alert>
            );
          }

          return null;
        })}
      </AlertGroup>
    );
  }
}

/**
 * Prop types
 *
 * @type {{toasts: Array, timeout: number}}
 */
ToastNotificationsList.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      alertType: PropTypes.oneOf([...Object.values(AlertVariant)]),
      header: PropTypes.node,
      message: PropTypes.node,
      removed: PropTypes.bool,
      paused: PropTypes.bool,
      persistent: PropTypes.bool
    })
  ),
  timeout: PropTypes.number
};

/**
 * Default props.
 *
 * @type {{toasts: *[], timeout: number}}
 */
ToastNotificationsList.defaultProps = {
  toasts: [],
  timeout: helpers.TOAST_NOTIFICATIONS_TIMEOUT
};

const mapStateToProps = state => ({ ...state.toastNotifications });

const ConnectedToastNotificationsList = connect(mapStateToProps)(ToastNotificationsList);

export { ConnectedToastNotificationsList as default, ConnectedToastNotificationsList, ToastNotificationsList };
