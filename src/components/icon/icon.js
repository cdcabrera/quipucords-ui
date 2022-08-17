import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@patternfly/react-core';
import {
  CheckCircleIcon,
  DisconnectedIcon,
  ErrorCircleOIcon,
  ExclamationTriangleIcon,
  IdCardIcon,
  PencilAltIcon,
  PficonNetworkRangeIcon,
  PficonSatelliteIcon,
  PficonVcenterIcon,
  TrashIcon,
  UnknownIcon
} from '@patternfly/react-icons';

/**
 * App icon variants
 *
 * @type {{running: string, canceled: string, paused: string, unreachable: string, success: string, created: string,
 *     pending: string, cancelled: string, completed: string, failed: string}}
 */
const IconVariant = {
  completed: 'success',
  success: 'success',
  failed: 'failed',
  canceled: 'failed',
  cancelled: 'failed',
  created: 'pending',
  pending: 'pending',
  running: 'pending',
  idCard: 'idCard',
  network: 'network',
  paused: 'paused',
  pencil: 'pencil',
  satellite: 'satellite',
  trash: 'trash',
  unknown: 'unknown',
  unreachable: 'unreachable',
  vcenter: 'vcenter'
};

// case 'vcenter':
//       return { type: 'pf', name: 'vcenter' };
//     case 'network':
//       return { type: 'pf', name: 'network-range' };
//     case 'satellite':
//       return { type: 'pf', name: 'satellite' };
//     default:
//       return { type: 'pf', name: '' };

/**
 * Return an icon
 *
 * @param {object} props
 * @param {string} props.symbol
 * @param {object} props.props
 * @returns {React.ReactNode}
 */
const Icon = ({ symbol, ...props }) => {
  switch (symbol) {
    case IconVariant.failed:
      return <ErrorCircleOIcon {...props} />;
    case IconVariant.idCard:
      return <IdCardIcon {...props} />;
    case IconVariant.network:
      return <PficonNetworkRangeIcon {...props} />;
    case IconVariant.paused:
      return <ExclamationTriangleIcon {...props} />;
    // return { type: 'pf', name: 'warning-triangle-o', classNames: [] };
    case IconVariant.pencil:
      return <PencilAltIcon {...props} />;
    case IconVariant.pending:
      return <Spinner isSVG {...props} />;
    // return { type: 'fa', name: 'spinner', classNames: ['fa-spin'] };
    case IconVariant.satellite:
      return <PficonSatelliteIcon {...props} />;
    case IconVariant.success:
      return <CheckCircleIcon {...props} />;
    case IconVariant.trash:
      return <TrashIcon {...props} />;
    case IconVariant.unreachable:
      return <DisconnectedIcon {...props} />;
    // return { type: 'pf', name: 'disconnected', classNames: ['is-error'] };
    case IconVariant.vcenter:
      return <PficonVcenterIcon {...props} />;
    case IconVariant.unknown:
    default:
      // console.error(`Unknown status: ${scanStatus}`);
      // return { type: 'pf', name: 'unknown', classNames: [] };
      return <UnknownIcon {...props} />;
  }
};

/**
 * Prop types
 *
 * @type {{symbol: string}}
 */
Icon.propTypes = {
  symbol: PropTypes.oneOf([...Object.values(IconVariant)])
};

/**
 * Default props
 *
 * @type {{symbol: null}}
 */
Icon.defaultProps = {
  symbol: null
};

export { Icon as default, Icon, IconVariant };
