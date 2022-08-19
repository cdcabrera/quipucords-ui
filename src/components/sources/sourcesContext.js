import React, { useState } from 'react';
import { useShallowCompareEffect, useUnmount } from 'react-use';
import { reduxActions, reduxTypes, storeHooks } from '../../redux';
import { apiTypes } from '../../constants/apiConstants';
import { helpers } from '../../common';
// import useSelectorsResponse from '../../redux/hooks/useReactRedux';
// import { useShallowCompareEffect } from 'react-use'

const usePoll = ({
  pollInterval = helpers.POLL_INTERVAL,
  useSelector: useAliasSelector = storeHooks.reactRedux.useSelector
} = {}) => {
  const [timer, setTimer] = useState();
  const [updatePoll, setUpdatePoll] = useState(0);
  // const [timer, setTimer] = useState();
  const updatedSources = useAliasSelector(({ sources }) => sources?.view?.data?.results, []); // const { results: sources = [] } = tempData || {};

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

    /*
    const pollingTimer = window.setTimeout(() => {
      console.log('>>>>>>>>>>>>> FIRING POLL');
      setUpdatePoll(helpers.getCurrentDate().getTime());
      setTimer(pollingTimer);
    }, 10000 || pollInterval);
    */

    if (shouldUpdate) {
      setTimer(
        window.setTimeout(() => {
          console.log('>>>>>>>>>>>>> FIRING POLL');
          setUpdatePoll(helpers.getCurrentDate().getTime());
        }, 10000 || pollInterval)
      );
    }
    /*
      setTimer(
        window.setTimeout(() => {
          // if (shouldUpdate) {
          // setUpdatePoll(true);
          // } else {
          //  setUpdatePoll(false);
          // }
          setUpdatePoll(helpers.getCurrentDate().getTime());
        }, pollInterval)
      );
      */
    // }
  }, [updatedSources]);

  return updatePoll;
};

const useDeleteSource = ({
  // deleteSource = reduxActions.sources.deleteSource,
  // useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useSelector: useAliasSelector = storeHooks.reactRedux.useSelector
} = {}) => {
  // reduxActions.sources.deleteSource(id)
  // const dispatch = useAliasDispatch();
  // deleteSource(id)(dispatch);
  // const { confirm, deleted } = useAliasSelectors([
  //  { id: 'confirm', selector: ({ sources }) => sources?.confirmDelete?.source },
  //  { id: 'deleted', selector: ({ sources }) => sources?.deleted }
  // ]);
  const result = useAliasSelector(({ sources }) => sources?.confirmDelete);

  // console.log('>>>>>>>>>>>>>>> IT WORKED', confirm, deleted);

  return {
    // confirm,
    // deleted
    result
  };
};

//
// const useOnConfirm = () => {};

const useOnDelete = ({
  deleteSource = reduxActions.sources.deleteSource,
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useSelectors: useAliasSelectors = storeHooks.reactRedux.useSelectors,
  useSelectorsResponse: useAliasSelectorsResponse = storeHooks.reactRedux.useSelectorsResponse
} = {}) => {
  const { error, fulfilled, message } = useAliasSelectorsResponse(({ sources }) => sources?.deleted);
  const dispatch = useAliasDispatch();
  // const { confirm, deleted, result } = useDeleteSource();
  const { sourceId } = useAliasSelectors([
    { id: 'sourceId', selector: ({ sources }) => sources?.confirmDelete?.source?.[apiTypes.API_RESPONSE_SOURCE_ID] }
    // { id: 'deleted', selector: ({ sources }) => sources?.deleted }
  ]);

  // const onCofirm = useAliasOnConfirm();
  // console.log('>>>>>>>>>>>>>>> ON DELETE 001', fulfilled, data);

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

  /*
  if (confirm && !deleted) {
    dispatch({
      type: reduxTypes.confirmationModal.CONFIRMATION_MODAL_HIDE
    });

    deleteSource(confirm[apiTypes.API_RESPONSE_SOURCE_ID]);
  }

  if (deleted && !confirm) {
    console.log('>>>>>>>>>>>>>>> DELETED');
  }
  */

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

export { context as default, context, useDeleteSource, useOnDelete, useOnEdit, useOnScan, usePoll };
