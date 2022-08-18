import { reduxTypes, store } from '../../redux'
import { helpers } from '../../common'
import React from 'react'

const onDelete = source => {
  const { deleteSource } = this.props;

  const onConfirm = () => {
    store.dispatch({
      type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_HIDE
    });

    deleteSource(source[apiTypes.API_RESPONSE_SOURCE_ID]).then(
      () => {
        store.dispatch({
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: 'success',
          message: (
            <span>
                Deleted source <strong>{source[apiTypes.API_RESPONSE_SOURCE_NAME]}</strong>.
              </span>
          )
        });

        store.dispatch({
          type: reduxTypes.view.DESELECT_ITEM,
          viewType: reduxTypes.view.SOURCES_VIEW,
          item: source
        });

        store.dispatch({
          type: reduxTypes.sources.UPDATE_SOURCES
        });
      },
      error => {
        store.dispatch({
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: 'danger',
          header: 'Error',
          message: helpers.getMessageFromResults(error).message
        });
      }
    );
  };

  store.dispatch({
    type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_SHOW,
    title: 'Delete Source',
    heading: (
      <span>
          Are you sure you want to delete the source <strong>{source[apiTypes.API_RESPONSE_SOURCE_NAME]}</strong>?
        </span>
    ),
    confirmButtonText: 'Delete',
    onConfirm
  });
};

const onEdit = source => {
  dispatch({
    type: reduxTypes.sources.EDIT_SOURCE_SHOW,
    source
  });
};

const onScan = source => {
  dispatch({
    type: reduxTypes.scans.EDIT_SCAN_SHOW,
    sources: [source]
  });
};
