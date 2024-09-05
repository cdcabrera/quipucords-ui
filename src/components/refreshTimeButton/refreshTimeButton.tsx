/**
 * Displays a button indicating the last data refresh time, dynamically updating.
 * Uses `react-i18next` for i18n support and intervals to refresh the display time. Suitable for live data contexts in
 * UIs.
 *
 * @module refreshTimeButton
 */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@patternfly/react-core';
import { RebootingIcon } from '@patternfly/react-icons';
import { helpers } from '../../helpers';

type RefreshTimeButtonProps = {
  lastRefresh?: number;
  onRefresh?: () => void;
  delay?: number;
};

const RefreshTimeButton: React.FC<RefreshTimeButtonProps> = ({
  lastRefresh = 0,
  onRefresh = Function.prototype,
  delay = 3000
}) => {
  const { t } = useTranslation();
  const [refresh, setRefresh] = React.useState<string | null>(
    (lastRefresh && helpers.getTimeDisplayHowLongAgo(lastRefresh)) || null
  );

  const pollingInterval = React.useRef<number>();

  useEffect(() => {
    pollingInterval.current = window.setInterval(() => {
      if (lastRefresh) {
        setRefresh(helpers.getTimeDisplayHowLongAgo(lastRefresh));
      }
    }, delay);

    return () => {
      clearInterval(pollingInterval.current);
      pollingInterval.current = undefined;
    };
  }, [lastRefresh, delay]);

  return (
    <Button variant="link" icon={<RebootingIcon />} onClick={() => onRefresh()} ouiaId="refresh">
      <span className="last-refresh-time">
        {t('refresh-time-button.refreshed', {
          context: lastRefresh && 'load',
          refresh: lastRefresh && refresh
        })}
      </span>
    </Button>
  );
};

export { RefreshTimeButton as default, RefreshTimeButton, type RefreshTimeButtonProps };
