import { toastNotificationTypes } from '../constants';

const initialState = {
  toasts: [],
  displayedToasts: 0
};

const toastNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case toastNotificationTypes.TOAST_ADD:
      const newToast = {
        header: action.header,
        message: action.message,
        alertType: action.alertType,
        persistent: action.persistent
      };

      return {
        ...state,
        ...{
          toasts: [...state.toasts, newToast],
          displayedToasts: state.displayedToasts + 1
        }
      };

    case toastNotificationTypes.TOAST_REMOVE:
      const updatedToasts = [...state.toasts];
      const updatedToastIndex = state.toasts.indexOf(action.toast);

      if (updatedToastIndex > -1) {
        updatedToasts[updatedToastIndex].removed = true;
      }

      return {
        ...state,
        ...{
          toasts: updatedToasts
        }
      };

    case toastNotificationTypes.TOAST_PAUSE:
      const updatedPausedToasts = [...state.toasts];
      const updatedPausedToastIndex = state.toasts.indexOf(action.toast);

      if (updatedPausedToastIndex > -1) {
        updatedPausedToasts[updatedPausedToastIndex].paused = true;
      }

      return {
        ...state,
        ...{
          toasts: updatedPausedToasts
        }
      };

    case toastNotificationTypes.TOAST_RESUME:
      const updatedResumeToasts = [...state.toasts];
      const updatedResumeToastIndex = state.toasts.indexOf(action.toast);

      if (updatedResumeToastIndex > -1) {
        updatedResumeToasts[updatedResumeToastIndex].paused = false;
      }

      return {
        ...state,
        ...{
          toasts: updatedResumeToasts
        }
      };

    default:
      return state;
  }
};

toastNotificationsReducer.initialState = initialState;

export { toastNotificationsReducer as default, initialState, toastNotificationsReducer };
