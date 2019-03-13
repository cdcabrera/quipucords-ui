import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Modal, Button, Form, Icon } from 'patternfly-react';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import { FormState } from '../formState/formState';
import { FormField, fieldValidation } from '../formField/formField';
import helpers from '../../common/helpers';
import apiTypes from '../../constants/apiConstants';

class CreateScanDialog extends React.Component {
  onClose = () => {
    store.dispatch({
      type: reduxTypes.scans.EDIT_SCAN_HIDE
    });
  };

  onValidateForm = ({ values = {} }) => {
    const errors = {};

    errors.scanName = fieldValidation.isEmpty(values.scanName);

    return errors;
  };

  onSubmit = ({ values }) => {
    const { addScan, startScan } = this.props;

    const scan = {
      [apiTypes.API_SUBMIT_SCAN_NAME]: values.scanName,
      [apiTypes.API_SUBMIT_SCAN_SOURCES]: values.sources
    };

    const addThenStartScan = async data => {
      const addResponse = await addScan(data);
      await startScan(addResponse.value.data[apiTypes.API_RESPONSE_SCAN_ID]);
    };

    addThenStartScan(scan).then(
      () => {
        const { props } = this;

        if (!props.show) {
          store.dispatch({
            type: reduxTypes.toastNotifications.TOAST_ADD,
            alertType: 'error',
            header: `Started scan ${values.scanName}`,
            message: props.errorMessage
          });
        }
      },
      () => {
        const { props } = this;

        if (!props.show) {
          store.dispatch({
            type: reduxTypes.toastNotifications.TOAST_ADD,
            alertType: 'error',
            header: `Error creating scan ${values.scanName}`,
            message: props.errorMessage
          });
        }
      }
    );
  };

  render() {
    const { error, errorMessage, show, sources } = this.props;

    if (!sources || sources.length === 0 || !sources[0]) {
      return null;
    }

    return (
      <Modal show={show} onHide={this.onClose}>
        <FormState
          validateOnMount
          setValues={{
            scanName: '',
            sources: sources.map(item => item.id),
            sourcesMultiple: sources.map(item => item.name).join('\n')
          }}
          validate={this.onValidateForm}
          onSubmit={this.onSubmit}
        >
          {({ errors, handleOnEvent, handleOnSubmit, isValid, touched, values }) => (
            <Form horizontal onSubmit={handleOnSubmit}>
              <Modal.Header>
                <button type="button" className="close" onClick={this.onClose} aria-hidden="true" aria-label="Close">
                  <Icon type="pf" name="close" />
                </button>
                <Modal.Title>Scan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {error && (
                  <Alert type="error">
                    <strong>Error</strong> {errorMessage}
                  </Alert>
                )}
                <FormField label="Name" error={touched.scanName && errors.scanName} errorMessage="Enter a scan name">
                  <Form.FormControl
                    type="text"
                    autoFocus
                    name="scanName"
                    value={values.scanName}
                    maxLength={100}
                    placeholder="Enter a name for the scan"
                    onChange={handleOnEvent}
                  />
                </FormField>
                <FormField label="Sources">
                  <Form.FormControl
                    className="quipucords-form-control"
                    componentClass="textarea"
                    name="sourcesMultiple"
                    value={values.sources}
                    rows={sources.length}
                    readOnly
                  />
                </FormField>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="default" className="btn-cancel" onClick={this.onClose}>
                  Cancel
                </Button>
                <Button bsStyle="primary" type="submit" disabled={!isValid}>
                  Scan
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </FormState>
      </Modal>
    );
  }
}

CreateScanDialog.propTypes = {
  addScan: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  // fulfilled: PropTypes.bool,
  // pending: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  sources: PropTypes.array,
  startScan: PropTypes.func
};

CreateScanDialog.defaultProps = {
  addScan: helpers.noop,
  error: false,
  errorMessage: null,
  // fulfilled: false,
  // pending: false,
  sources: [],
  startScan: helpers.noop
};

const mapDispatchToProps = dispatch => ({
  addScan: data => dispatch(reduxActions.scans.addScan(data)),
  startScan: data => dispatch(reduxActions.scans.addStartScan(data))
});

const mapStateToProps = state => ({ ...state.scansEdit });

const ConnectedCreateScanDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateScanDialog);

export { ConnectedCreateScanDialog as default, ConnectedCreateScanDialog, CreateScanDialog };
