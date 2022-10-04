import React from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertVariant, EmptyState, EmptyStateVariant, Spinner } from '@patternfly/react-core';
import { ContextIcon, ContextIconVariant } from '../contextIcon/contextIcon';
import { useGetScanJob } from './scansContext';
import { Table, TableVariant } from '../table/table';
import { translate } from '../i18n/i18n';

/**
 * Return a scan jobs listing for "sources".
 *
 * @param {object} props
 * @param {string} props.id
 * @param {Function} props.t
 * @param {Function} props.useGetScanJob
 * @returns {React.ReactNode}
 */
const ScanSourceList = ({ id, t, useGetScanJob: useAliasGetScanJob }) => {
  const { error, errorMessage, pending, data: scanJobsList } = useAliasGetScanJob(id);

  if (pending) {
    return (
      <EmptyState className="quipucords-empty-state" variant={EmptyStateVariant.large}>
        <Spinner isSVG size="sm" /> {t('view.loading')}
      </EmptyState>
    );
  }

  if (error) {
    return (
      <EmptyState className="quipucords-empty-state__alert">
        <Alert isInline isPlain variant={AlertVariant.danger} title={t('view.error', { context: 'scan-jobs' })}>
          {t('view.error-message', { context: ['scan-jobs'], message: errorMessage })}
        </Alert>
      </EmptyState>
    );
  }

  return (
    <Table
      className="quipucords-table__scan-jobs"
      variant={TableVariant.compact}
      isBorders={false}
      rows={scanJobsList?.map(({ taskStatusMessage, taskStatus, taskType, name, sourceType }) => ({
        cells: [
          {
            width: 20,
            content: (
              <React.Fragment>
                <ContextIcon symbol={ContextIconVariant[sourceType]} /> {name}
              </React.Fragment>
            ),
            dataLabel: t('table.label', { context: ['source'] })
          },
          {
            content: t('table.label', {
              context: ['scan-job', taskType, (taskStatusMessage && 'message') || (taskStatus && 'status')],
              status: taskStatus,
              message: taskStatusMessage
            }),
            dataLabel: t('table.label', { context: ['status', 'scan'] })
          }
        ]
      }))}
    />
  );
};

/**
 * Prop types
 *
 * @type {{t: Function, id: string|number, useGetScanJob: Function}}
 */
ScanSourceList.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  t: PropTypes.func,
  useGetScanJob: PropTypes.func
};

/**
 * Default props
 *
 * @type {{t: translate, useGetScanJob: Function}}
 */
ScanSourceList.defaultProps = {
  t: translate,
  useGetScanJob
};

export { ScanSourceList as default, ScanSourceList };
