import React, { useState } from 'react';
import { useShallowCompareEffect, useUnmount } from 'react-use';
import { reduxActions, reduxTypes, storeHooks } from '../../redux';
import { apiTypes } from '../../constants/apiConstants';
import { helpers } from '../../common';

const usePoll = ({
  pollInterval = helpers.POLL_INTERVAL,
  useSelector: useAliasSelector = storeHooks.reactRedux.useSelector
} = {}) => {
  const [timer, setTimer] = useState();
  const [updatePoll, setUpdatePoll] = useState(0);
  const updatedSources = useAliasSelector(({ sources }) => sources?.view?.data?.results, []);

  useUnmount(() => {
    window.clearTimeout(timer);
  });

  useShallowCompareEffect(() => {
    const shouldUpdate = updatedSources.find(
      ({ connection }) =>
        connection.status === 'created' || connection.status === 'pending' || connection.status === 'running'
    );

    if (shouldUpdate || !updatedSources.length) {
      window.clearTimeout(timer);
    }

    if (shouldUpdate) {
      setTimer(
        window.setTimeout(() => {
          setUpdatePoll(helpers.getCurrentDate().getTime());
        }, 10000 || pollInterval)
      );
    }
  }, [updatedSources]);

  return updatePoll;
};

const useOnDelete = ({
  deleteSource = reduxActions.sources.deleteSource,
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useSelectors: useAliasSelectors = storeHooks.reactRedux.useSelectors,
  useSelectorsResponse: useAliasSelectorsResponse = storeHooks.reactRedux.useSelectorsResponse
} = {}) => {
  const { error, fulfilled, message } = useAliasSelectorsResponse(({ sources }) => sources?.deleted);
  const dispatch = useAliasDispatch();
  const { sourceId } = useAliasSelectors([
    { id: 'sourceId', selector: ({ sources }) => sources?.confirmDelete?.source?.[apiTypes.API_RESPONSE_SOURCE_ID] }
  ]);

  useShallowCompareEffect(() => {
    if (sourceId) {
      dispatch({
        type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_HIDE
      });

      deleteSource(sourceId)(dispatch);
    }
  }, [sourceId, deleteSource, dispatch]);

  useShallowCompareEffect(() => {
    if (fulfilled) {
      // console.log('FULFILLED', sourceId);
      dispatch([
        {
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: 'success',
          message: <span>Deleted source.</span>
        },
        // {
        //  type: reduxTypes.view.DESELECT_ITEM,
        //  viewType: reduxTypes.view.SOURCES_VIEW,
        //  item: sourceToDelete
        // },
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
    // console.log('>>>>>>>>>>>>>>> ON DELETE 002', confirm, deleted);
    /*
    const onConfirm = () => {
      dispatch({
        type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_HIDE
      });

      deleteSource(source[apiTypes.API_RESPONSE_SOURCE_ID]).then(
        () => {
          dispatch([
            {
              type: reduxTypes.toastNotifications.TOAST_ADD,
              alertType: 'success',
              message: (
                <span>
                  Deleted source <strong>{source[apiTypes.API_RESPONSE_SOURCE_NAME]}</strong>.
                </span>
              )
            },
            {
              type: reduxTypes.view.DESELECT_ITEM,
              viewType: reduxTypes.view.SOURCES_VIEW,
              item: source
            },
            {
              type: reduxTypes.sources.UPDATE_SOURCES
            }
          ]);
        },
        error => {
          dispatch({
            type: reduxTypes.toastNotifications.TOAST_ADD,
            alertType: 'danger',
            header: 'Error',
            message: helpers.getMessageFromResults(error).message
          });
        }
      );
    };
     */

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

const useOnEdit = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return source => {
    dispatch({
      type: reduxTypes.sources.EDIT_SOURCE_SHOW,
      source
    });
  };
};

const useOnScan = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return source => {
    dispatch({
      type: reduxTypes.scans.EDIT_SCAN_SHOW,
      sources: [source]
    });
  };
};

const context = {
  useDeleteSource,
  useOnDelete,
  useOnEdit,
  useOnScan,
  usePoll
};

export { context as default, context, useOnDelete, useOnEdit, useOnScan, usePoll };
