import React, { useState } from 'react';
import { useShallowCompareEffect, useUnmount } from 'react-use';
import { reduxActions, reduxTypes, storeHooks } from '../../redux';
import { apiTypes } from '../../constants/apiConstants';
import { helpers } from '../../common';

/**
 * On Delete confirmation, and action.
 *
 * @param {object} options
 * @param {Function} options.deleteSource
 * @param {Function} options.useDispatch
 * @param {Function} options.useSelector
 * @param {Function} options.useSelectorsResponse
 * @returns {Function}
 */
const useOnDelete = ({
  deleteSource = reduxActions.sources.deleteSource,
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useSelector: useAliasSelector = storeHooks.reactRedux.useSelector,
  useSelectorsResponse: useAliasSelectorsResponse = storeHooks.reactRedux.useSelectorsResponse
} = {}) => {
  const dispatch = useAliasDispatch();
  const sourceToDelete = useAliasSelector(({ sources }) => sources?.confirmDelete?.source, {});
  const { error, fulfilled, message } = useAliasSelectorsResponse(({ sources }) => sources?.deleted);
  const { [apiTypes.API_RESPONSE_SOURCE_ID]: sourceId, [apiTypes.API_RESPONSE_SOURCE_NAME]: sourceName } =
    sourceToDelete;

  useShallowCompareEffect(() => {
    if (sourceId) {
      dispatch([
        {
          type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_HIDE
        }
      ]);

      deleteSource(sourceId)(dispatch);
    }
  }, [sourceId, deleteSource, dispatch]);

  useShallowCompareEffect(() => {
    if (fulfilled) {
      dispatch([
        {
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: 'success',
          message: (
            <React.Fragment>
              Deleted source <strong>{sourceName}</strong>.
            </React.Fragment>
          )
        },
        {
          type: reduxTypes.view.DESELECT_ITEM,
          viewType: reduxTypes.view.SOURCES_VIEW,
          item: sourceToDelete
        },
        {
          type: reduxTypes.sources.UPDATE_SOURCES
        }
      ]);
    }

    if (error) {
      dispatch({
        type: reduxTypes.toastNotifications.TOAST_ADD,
        alertType: 'danger',
        header: 'Error',
        message
      });
    }
  }, [error, fulfilled, message, dispatch]);

  return source => {
    dispatch({
      type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_SHOW,
      title: 'Delete Source',
      heading: (
        <span>
          Are you sure you want to delete the source <strong>{source[apiTypes.API_RESPONSE_SOURCE_NAME]}</strong>?
        </span>
      ),
      confirmButtonText: 'Delete',
      onConfirm: () =>
        dispatch({
          type: reduxTypes.sources.CONFIRM_DELETE_SOURCE,
          source
        })
    });
  };
};

/**
 * On edit a source
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnEdit = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return source => {
    dispatch({
      type: reduxTypes.sources.EDIT_SOURCE_SHOW,
      source
    });
  };
};

/**
 * On scan a source
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnScan = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return source => {
    dispatch({
      type: reduxTypes.scans.EDIT_SCAN_SHOW,
      sources: [source]
    });
  };
};

/**
 * Poll sources data for pending results.
 *
 * @param {object} options
 * @param {number} options.pollInterval
 * @param {Function} options.useSelector
 * @returns {Function}
 */
const usePoll = ({
  pollInterval = helpers.POLL_INTERVAL,
  useSelector: useAliasSelector = storeHooks.reactRedux.useSelector
} = {}) => {
  const [timer, setTimer] = useState();
  const [updatePoll, setUpdatePoll] = useState(0);
  const updatedSources = useAliasSelector(({ sources }) => sources?.view?.data?.results, []);
  const shouldUpdate = updatedSources.find(
    ({ connection }) =>
      connection.status === 'created' || connection.status === 'pending' || connection.status === 'running'
  );

  useUnmount(() => {
    window.clearTimeout(timer);
  });

  useShallowCompareEffect(() => {
    if (shouldUpdate) {
      setTimer(
        window.setTimeout(() => {
          setUpdatePoll(helpers.getCurrentDate().getTime());
        }, pollInterval)
      );
    }
  }, [pollInterval, shouldUpdate]);

  return updatePoll;
};

const context = {
  useOnDelete,
  useOnEdit,
  useOnScan,
  usePoll
};

export { context as default, context, useOnDelete, useOnEdit, useOnScan, usePoll };
