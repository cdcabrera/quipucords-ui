/**
 * A React component wrapper for initializing and providing an i18n context for internationalizing an application.
 * Utilizes `i18next` and `i18next-xhr-backend` for loading translations and dynamically changing languages based
 * on user preference or environment settings. Supports fallback languages and custom loading paths for language files.
 *
 * @module I18n
 */
import React, { useState, useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import XHR from 'i18next-http-backend';
import { helpers } from '../../helpers';
import { EMPTY_CONTEXT, translate } from './i18nHelpers';

interface I18nProps {
  children: React.ReactNode;
  fallbackLng?: string;
  loadPath?: string;
  locale?: string | null;
}

const I18n: React.FC<I18nProps> = ({
  fallbackLng = process.env.REACT_APP_CONFIG_SERVICE_LOCALES_DEFAULT_LNG,
  loadPath = process.env.REACT_APP_CONFIG_SERVICE_LOCALES_PATH,
  locale = process.env.REACT_APP_CONFIG_SERVICE_LOCALES_DEFAULT_LNG,
  children
}) => {
  const [initialized, setInitialized] = useState(false);

  /**
   * Initialize i18next on mount only
   */
  useEffect(() => {
    const setup = async () => {
      try {
        await i18next
          .use(XHR)
          .use(initReactI18next)
          .init({
            backend: {
              loadPath
            },
            fallbackLng,
            lng: undefined,
            debug: !helpers.PROD_MODE,
            ns: ['default'],
            defaultNS: 'default',
            react: {
              useSuspense: false
            }
          });
      } catch (e) {
        //
      }

      setInitialized(true);
    };

    setup();
  }, []);

  /**
   * Update locale.
   */
  useEffect(() => {
    if (initialized && locale) {
      try {
        i18next.changeLanguage(locale);
      } catch (e) {
        //
      }
    }
  }, [initialized, locale]);

  return (initialized && children) || null;
};

export { I18n as default, I18n, EMPTY_CONTEXT, translate };
