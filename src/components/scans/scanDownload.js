import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'patternfly-react';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import { helpers } from '../../common/helpers';
import Tooltip from '../tooltip/tooltip';

class ScanDownload extends React.Component {
  onReportDownload = () => {
    const { downloadId, getReportsDownload } = this.props;

    getReportsDownload(downloadId).then(
      () => this.notifyDownloadStatus(false),
      error => this.notifyDownloadStatus(true, error.message)
    );
  };

  notifyDownloadStatus(error, results) {
    const { downloadName } = this.props;

    if (error) {
      store.dispatch({
        type: reduxTypes.toastNotifications.TOAST_ADD,
        alertType: 'error',
        header: 'Error',
        message: helpers.getMessageFromResults(results).message
      });
    } else {
      store.dispatch({
        type: reduxTypes.toastNotifications.TOAST_ADD,
        alertType: 'success',
        message: (
          <span>
            Report <strong>{(downloadName && `${downloadName} `) || ''}</strong> downloaded.
          </span>
        )
      });
    }
  }

  render() {
    const { children, downloadId, downloadName, getReportsDownload, ...props } = this.props;

    return (
      <Tooltip tooltip="Download">
        <Button id={helpers.generateId()} title="Download" onClick={this.onReportDownload} {...props} bsStyle="link">
          {children}
        </Button>
      </Tooltip>
    );
  }
}

ScanDownload.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  downloadId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  downloadName: PropTypes.string,
  getReportsDownload: PropTypes.func
};

ScanDownload.defaultProps = {
  children: <Icon type="pf" name="export" />,
  downloadName: null,
  getReportsDownload: helpers.noop
};

const mapDispatchToProps = dispatch => ({
  getReportsDownload: id => dispatch(reduxActions.reports.getReportsDownload(id))
});

const mapStateToProps = () => ({});

const ConnectedScanDownload = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScanDownload);

export { ConnectedScanDownload as default, ConnectedScanDownload, ScanDownload };
