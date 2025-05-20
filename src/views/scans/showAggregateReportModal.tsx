import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Bullseye,
  DescriptionList,
  DescriptionListTerm,
  DescriptionListDescription,
  DescriptionListGroup,
  Flex,
  FlexItem,
  Modal,
  ModalVariant,
  Title
} from '@patternfly/react-core';
import { helpers } from '../../helpers';
import { type ReportAggregateDiagnosticsType, type ReportAggregateResultsType } from '../../types/types';

type PartialReportsAggregateResponse = {
  results?: Partial<ReportAggregateResultsType>;
  diagnostics?: Partial<ReportAggregateDiagnosticsType>;
};

type Report = {
  id: number;
  report: PartialReportsAggregateResponse;
};

interface ShowAggregateReportModalProps {
  isOpen: boolean;
  report?: Report;
  onClose?: () => void;
  actions?: React.ReactNode[];
}

/**
 * A filter list for displaying specific report properties. Order does not represent display sort.
 */
const statsFilter = [
  'ansible_hosts_all',
  'instances_hypervisor',
  'instances_physical',
  'instances_virtual',
  'openshift_cores',
  'socket_pairs',
  'system_creation_date_average',
  'vmware_hosts',
  'inspect_result_status_failed',
  'inspect_result_status_success',
  'inspect_result_status_unknown',
  'inspect_result_status_unreachable',
  'missing_pem_files',
  'missing_system_creation_date',
  'missing_system_purpose'
];

/**
 * Apply list format, sort, and filter to report
 */
const formatSortFilterReportStats = (
  report: PartialReportsAggregateResponse = {},
  { filter = statsFilter }: { filter?: string[] } = {}
) => {
  const { results: resultStats = {}, diagnostics: diagnosticStats = {} } = report;

  const formatFilterSort = (arr): [string, unknown][] =>
    arr
      .filter(([key]) => filter.includes(key))
      .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
      .map(([key, value]) => {
        const updatedValue = (
          (key === 'system_creation_date_average' && helpers.formatDate(value as Date)) ||
          value
        )?.toString();

        return [key, updatedValue];
      });

  const results = formatFilterSort([...(resultStats && Object.entries(resultStats))]);
  const diagnostics = formatFilterSort([...(diagnosticStats && Object.entries(diagnosticStats))]);

  return {
    hasResults: results.length > 0,
    hasDiagnostics: diagnostics.length > 0,
    results,
    diagnostics
  };
};

/**
 * Modal display for report summary stats.
 */
const ShowAggregateReportModal: React.FC<ShowAggregateReportModalProps> = ({
  isOpen,
  report,
  onClose = Function.prototype,
  actions
}) => {
  const { t } = useTranslation();
  const { hasDiagnostics, hasResults, results, diagnostics } = formatSortFilterReportStats(report?.report);

  const descriptionGroup = (key, value) => (
    <DescriptionListGroup key={key}>
      <DescriptionListTerm>{t('modal.label', { context: key })}</DescriptionListTerm>
      <DescriptionListDescription>{value}</DescriptionListDescription>
    </DescriptionListGroup>
  );

  return (
    <Modal
      variant={(hasResults && hasDiagnostics && ModalVariant.medium) || ModalVariant.small}
      title={t('modal.title', { context: 'scan-summary' })}
      isOpen={isOpen}
      onClose={() => onClose()}
      {...(actions && { actions })}
    >
      <Title className="pf-v5-u-mb-lg" headingLevel="h2" size="md">
        {t('modal.subtitle', { context: 'scan-id', value: report?.id })}
      </Title>
      <Bullseye>
        <Flex>
          {!hasResults && !hasDiagnostics && t('modal.description', { context: 'scan-summary-missing' })}
          {hasResults && (
            <FlexItem>
              <DescriptionList isHorizontal isFluid isCompact>
                {results.map(([key, value]) => descriptionGroup(key, value))}
              </DescriptionList>
            </FlexItem>
          )}
          {hasDiagnostics && (
            <FlexItem>
              <DescriptionList isHorizontal isFluid isCompact>
                {diagnostics.map(([key, value]) => descriptionGroup(key, value))}
              </DescriptionList>
            </FlexItem>
          )}
        </Flex>
      </Bullseye>
    </Modal>
  );
};

export {
  ShowAggregateReportModal as default,
  ShowAggregateReportModal,
  formatSortFilterReportStats,
  statsFilter,
  type PartialReportsAggregateResponse,
  type Report,
  type ShowAggregateReportModalProps
};
