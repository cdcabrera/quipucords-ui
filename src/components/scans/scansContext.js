import React, { useCallback, useEffect, useState } from 'react';
import { AlertVariant } from '@patternfly/react-core';
import { useShallowCompareEffect } from 'react-use';
import { reduxActions, reduxTypes, storeHooks } from '../../redux';
import { useTimeout } from '../../hooks';
// import { apiTypes } from '../../constants/apiConstants';
import { helpers } from '../../common';
import apiTypes from '../../constants/apiConstants';
// import { translate } from '../i18n/i18n';

/**
 * On expand a row facet.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnExpand = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return ({ isExpanded, cellIndex, data }) => {
    dispatch({
      type: isExpanded ? reduxTypes.scans.EXPANDED_SCAN : reduxTypes.scans.NOT_EXPANDED_SCAN,
      viewType: reduxTypes.view.SCANS_VIEW,
      item: data.item,
      cellIndex
    });
  };
};

/**
 * On refresh view.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnRefresh = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return () => {
    dispatch({
      type: reduxTypes.scans.UPDATE_SCANS
    });
  };
};

const useOnScanAction = ({
  cancelScan = reduxActions.scans.cancelScan,
  getReportsDownload = reduxActions.reports.getReportsDownload,
  pauseScan = reduxActions.scans.pauseScan,
  restartScan = reduxActions.scans.restartScan,
  startScan = reduxActions.scans.startScan,
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  useSelectorsResponse: useAliasSelectorsResponse = storeHooks.reactRedux.useSelectorsResponse
} = {}) => {
  const [updatedScan, setUpdatedScan] = useState({});
  const { id: scanId, name: scanName, context: scanContext } = updatedScan;
  const dispatch = useAliasDispatch();
  const { error, fulfilled, message, pending } = useAliasSelectorsResponse(({ scans }) => scans?.action?.[scanId]);

  useEffect(() => {
    if (scanId && !pending) {
      const dispatchList = [];

      if (fulfilled) {
        dispatchList.push({
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: AlertVariant.success,
          message: (
            <React.Fragment>
              Scan <strong>{scanName || scanId}</strong> {scanContext}
            </React.Fragment>
          )
        });
      }

      if (error) {
        dispatchList.push({
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: AlertVariant.danger,
          header: 'Error',
          message
        });
      }

      if (dispatchList.length) {
        dispatch([
          ...dispatchList,
          {
            type: reduxTypes.scans.UPDATE_SCANS
          }
        ]);

        setUpdatedScan({});
      }
    }
  }, [dispatch, error, fulfilled, message, pending, scanContext, scanId, scanName]);

  const onCancel = useCallback(
    ({ [apiTypes.API_RESPONSE_SCAN_MOST_RECENT]: mostRecent, [apiTypes.API_RESPONSE_SCAN_NAME]: name }) => {
      const id = mostRecent[apiTypes.API_RESPONSE_SCAN_MOST_RECENT_ID];
      cancelScan(id)(dispatch);
      setUpdatedScan(() => ({ id, name, context: 'canceled' }));
    },
    [cancelScan, dispatch]
  );

  const onDownload = useCallback(
    ({ [apiTypes.API_RESPONSE_SCAN_MOST_RECENT]: mostRecent, [apiTypes.API_RESPONSE_SCAN_NAME]: name }) => {
      const id = mostRecent[apiTypes.API_RESPONSE_SCAN_MOST_RECENT_REPORT_ID];
      getReportsDownload(id)(dispatch);
      setUpdatedScan(() => ({ id, name, context: 'download' }));
    },
    [getReportsDownload, dispatch]
  );

  const onPause = useCallback(
    ({ [apiTypes.API_RESPONSE_SCAN_MOST_RECENT]: mostRecent, [apiTypes.API_RESPONSE_SCAN_NAME]: name }) => {
      const id = mostRecent[apiTypes.API_RESPONSE_SCAN_MOST_RECENT_ID];
      pauseScan(id)(dispatch);
      setUpdatedScan(() => ({ id, name, context: 'paused' }));
    },
    [pauseScan, dispatch]
  );

  const onRestart = useCallback(
    ({ [apiTypes.API_RESPONSE_SCAN_MOST_RECENT]: mostRecent, [apiTypes.API_RESPONSE_SCAN_NAME]: name }) => {
      const id = mostRecent[apiTypes.API_RESPONSE_SCAN_MOST_RECENT_ID];
      restartScan(id)(dispatch);
      setUpdatedScan(() => ({ id, name, context: 'restart' }));
    },
    [restartScan, dispatch]
  );

  const onStart = useCallback(
    ({ [apiTypes.API_RESPONSE_SCAN_ID]: id, [apiTypes.API_RESPONSE_SCAN_NAME]: name }) => {
      startScan(id)(dispatch);
      setUpdatedScan(() => ({ id, name, context: 'play' }));
    },
    [startScan, dispatch]
  );

  return {
    onCancel,
    onDownload,
    onPause,
    onRestart,
    onStart
  };
};

/**
 * On select a row.
 *
 * @param {object} options
 * @param {Function} options.useDispatch
 * @returns {Function}
 */
const useOnSelect = ({ useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch } = {}) => {
  const dispatch = useAliasDispatch();

  return ({ isSelected, data }) => {
    dispatch({
      type: isSelected ? reduxTypes.scans.SELECT_SCAN : reduxTypes.scans.DESELECT_SCAN,
      viewType: reduxTypes.view.SCANS_VIEW,
      item: data.item
    });
  };
};

/**
 * Poll data for pending results.
 *
 * @param {object} options
 * @param {number} options.pollInterval
 * @param {Function} options.useSelector
 * @param {Function} options.useTimeout
 * @returns {Function}
 */
const usePoll = ({
  pollInterval = helpers.POLL_INTERVAL,
  useSelector: useAliasSelector = storeHooks.reactRedux.useSelector,
  useTimeout: useAliasTimeout = useTimeout
} = {}) => {
  const updatedSources = useAliasSelector(({ scans }) => scans?.view?.data?.results, []);
  const { update } = useAliasTimeout(() => {
    const filteredSources = updatedSources.filter(
      ({ [apiTypes.API_RESPONSE_SCAN_MOST_RECENT]: mostRecent }) =>
        mostRecent?.status === 'created' || mostRecent?.status === 'pending' || mostRecent?.status === 'running'
    );

    return filteredSources.length > 0;
  }, pollInterval);

  return update;
};

/**
 * Get scans
 *
 * @param {object} options
 * @param {Function} options.getScans
 * @param {Function} options.useDispatch
 * @param {Function} options.usePoll
 * @param {Function} options.useSelectors
 * @param {Function} options.useSelectorsResponse
 * @returns {{date: *, sources: *[], expandedSources: *, pending: boolean, errorMessage: null, fulfilled: boolean, error: boolean, selectedSources: *}}
 */
const useGetScans = ({
  getScans = reduxActions.scans.getScans,
  useDispatch: useAliasDispatch = storeHooks.reactRedux.useDispatch,
  usePoll: useAliasPoll = usePoll,
  useSelectors: useAliasSelectors = storeHooks.reactRedux.useSelectors,
  useSelectorsResponse: useAliasSelectorsResponse = storeHooks.reactRedux.useSelectorsResponse
} = {}) => {
  const dispatch = useAliasDispatch();
  const pollUpdate = useAliasPoll();
  const [refreshUpdate, selectedRows, expandedRows, viewOptions] = useAliasSelectors([
    ({ scans }) => scans.update,
    ({ scans }) => scans.selected,
    ({ scans }) => scans.expanded,
    ({ viewOptions: stateViewOptions }) => stateViewOptions[reduxTypes.view.SCANS_VIEW]
  ]);
  const {
    data: responseData,
    error,
    fulfilled,
    message: errorMessage,
    pending,
    responses = {}
  } = useAliasSelectorsResponse({ id: 'view', selector: ({ scans }) => scans.view });

  const [{ date } = {}] = responses?.list || [];
  const { results: data = [] } = responseData?.view || {};
  const query = helpers.createViewQueryObject(viewOptions, { [apiTypes.API_QUERY_SCAN_TYPE]: 'inspect' });

  useShallowCompareEffect(() => {
    getScans(query)(dispatch);
  }, [dispatch, getScans, pollUpdate, query, refreshUpdate]);

  return {
    pending,
    error,
    errorMessage,
    fulfilled,
    data,
    date,
    selectedRows,
    expandedRows
  };
};

const context = {
  useGetScans,
  useOnExpand,
  useOnRefresh,
  useOnScanAction,
  useOnSelect,
  usePoll
};

export { context as default, context, useGetScans, useOnExpand, useOnRefresh, useOnScanAction, useOnSelect, usePoll };
