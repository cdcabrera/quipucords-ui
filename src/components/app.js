import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMount } from 'react-use';
import { reduxActions, storeHooks } from '../redux';
import { ViewContext } from './view/viewContext';
import { I18n } from './i18n/i18n';
import Authentication from './authentication/authentication';
import PageLayout from './pageLayout/pageLayout';
import { Router } from './router/router';
import ToastNotificationsList from './toastNotificationsList/toastNotificationsList';
import ConfirmationModal from './confirmationModal/confirmationModal';
import AboutModal from './aboutModal/aboutModal';
import AddSourceWizard from './addSourceWizard/addSourceWizard';
import CreateCredentialDialog from './createCredentialDialog/createCredentialDialog';
import CreateScanDialog from './createScanDialog/createScanDialog';
import MergeReportsDialog from './mergeReportsDialog/mergeReportsDialog';

const App = ({ getLocale, useDispatch: useAliasDispatch, useSelector: useAliasSelector }) => {
  const [context, setContext] = useState({});
  const dispatch = useAliasDispatch();
  const locale = useAliasSelector(({ user }) => user?.session?.locale?.value);

  useMount(() => {
    dispatch(getLocale());
  });

  return (
    <I18n locale={locale || null}>
      <Authentication>
        <ViewContext.Provider value={[context, setContext]}>
          <PageLayout>
            <Router />
            <ToastNotificationsList />
            <ConfirmationModal />
            <AboutModal />
            <AddSourceWizard />
            <CreateCredentialDialog />
            <CreateScanDialog />
            <MergeReportsDialog />
          </PageLayout>
        </ViewContext.Provider>
      </Authentication>
    </I18n>
  );
};

App.propTypes = {
  getLocale: PropTypes.func,
  useDispatch: PropTypes.func,
  useSelector: PropTypes.func
};

App.defaultProps = {
  getLocale: reduxActions.user.getLocale,
  useDispatch: storeHooks.reactRedux.useDispatch,
  useSelector: storeHooks.reactRedux.useSelector
};

export { App as default, App };
