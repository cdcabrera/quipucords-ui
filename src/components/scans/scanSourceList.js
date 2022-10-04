import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AlertVariant,
  EmptyState,
  EmptyStateVariant,
  List,
  ListItem,
  ListVariant,
  Spinner
} from '@patternfly/react-core';
import { ContextIcon, ContextIconVariant } from '../contextIcon/contextIcon';
import { useGetScanJob } from './scansContext';
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
  const { error, errorMessage, pending, data } = useAliasGetScanJob(id);

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
    <List isPlain>
      {data?.map(({ id: sourceId, taskStatusMessage, taskStatus, taskType, name, sourceType }) => (
        <ListItem key={sourceId}>
          <List isPlain variant={ListVariant.inline}>
            <ListItem key={name}>
              <ContextIcon symbol={ContextIconVariant[sourceType]} /> {name}
            </ListItem>
            <ListItem key={`desc-${name}`}>
              {t('table.label', {
                context: ['scan-job', taskType, (taskStatusMessage && 'message') || (taskStatus && 'status')],
                status: taskStatus,
                message: taskStatusMessage
              })}
            </ListItem>
          </List>
        </ListItem>
      ))}
    </List>
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
