import React from 'react';
import PropTypes from 'prop-types';
import { useMount } from 'react-use';
import { connect } from 'react-redux';
import { Alert, EmptyState, Modal } from 'patternfly-react';
import { reduxActions } from '../../redux';
import helpers from '../../common/helpers';
import { PageLayout } from '../pageLayout/pageLayout';

const Authentication = ({ authorizeUser, children, session }) => {
  const { errorMessage, authorized: isAuthorizied } = session || {};

  useMount(async () => {
    if (!isAuthorizied) {
      await authorizeUser();
    }
  });

  if (isAuthorizied) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  if (session.pending) {
    return (
      <Modal bsSize="lg" backdrop={false} show animation={false}>
        <Modal.Body>
          <div className="spinner spinner-xl" />
          <div className="text-center">Logging in...</div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <PageLayout>
      <EmptyState className="full-page-blank-slate">
        <Alert type="error">
          <span>
            Login error: {errorMessage.replace(/\.$/, '')}
            {errorMessage && '.'}
            {!isAuthorizied && (
              <React.Fragment>
                Please <a href="/login">login</a> to continue.
              </React.Fragment>
            )}
          </span>
        </Alert>
      </EmptyState>
    </PageLayout>
  );
};

Authentication.propTypes = {
  authorizeUser: PropTypes.func,
  children: PropTypes.node.isRequired,
  session: PropTypes.shape({
    authorized: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    pending: PropTypes.bool
  })
};

Authentication.defaultProps = {
  authorizeUser: helpers.noop,
  session: {
    authorized: false,
    error: false,
    errorMessage: '',
    pending: false
  }
};

const mapDispatchToProps = dispatch => ({
  authorizeUser: () => dispatch(reduxActions.user.authorizeUser())
});

const mapStateToProps = state => ({ session: state.user.session });

const ConnectedAuthentication = connect(mapStateToProps, mapDispatchToProps)(Authentication);

export { ConnectedAuthentication as default, ConnectedAuthentication, Authentication };
