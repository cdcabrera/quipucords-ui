/**
 * Progress Stepper Section Component
 *
 * Displays a 5-step horizontal process flow for getting prepared before diving in.
 * Uses PatternFly styling and CSS tokens for consistent appearance.
 *
 * @module progressStepperSection
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Title,
  TitleSizes
} from '@patternfly/react-core';

export const ProgressStepperSection: React.FunctionComponent = () => {
  const { t } = useTranslation();

  const steps = [
    {
      title: t('overview.progress.identify-sources.title', { default: 'Identify all the sources' }),
      description: t('overview.progress.identify-sources.description', { 
        default: "It's likely you have multiple types of sources to add." 
      })
    },
    {
      title: t('overview.progress.gather-credentials.title', { default: 'Gather and add credentials' }),
      description: t('overview.progress.gather-credentials.description', { 
        default: 'Prepare the credentials for each of your source. Some of them may require more than one.' 
      })
    },
    {
      title: t('overview.progress.add-sources.title', { default: 'Add your sources' }),
      description: t('overview.progress.add-sources.description', { 
        default: 'You are ready to connect your source now with the credentials from the last steps.' 
      })
    },
    {
      title: t('overview.progress.run-scans.title', { default: 'Run scans, download reports' }),
      description: t('overview.progress.run-scans.description', { 
        default: 'Once the sources are connected, run the scan. Download the report when scan is completed.' 
      })
    },
    {
      title: t('overview.progress.analyze-reports.title', { default: 'Reports analysis' }),
      description: t('overview.progress.analyze-reports.description', { 
        default: 'You can either sent the report to our representatives or upload the report to Insights for analysis. You are done!' 
      })
    }
  ];

  return (
    <Card style={{ overflow: 'visible' }}>
      <CardHeader>
        <CardTitle>
          <Title headingLevel="h2" size={TitleSizes.lg}>
            {t('overview.progress.title', { default: 'Get prepared before dive in' })}
          </Title>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ padding: 'var(--pf-v6-global--spacer--lg) 0' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: 'var(--pf-v6-global--spacer--md)',
            overflowX: 'auto',
            padding: 'var(--pf-v6-global--spacer--sm) 0'
          }}>
            {steps.map((step, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                flex: 1, 
                minWidth: '200px', 
                position: 'relative' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 'var(--pf-v6-global--spacer--md)', 
                  width: '100%' 
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--pf-v6-global--primary-color--100)',
                    color: 'var(--pf-v6-global--Color--light-100)',
                    fontWeight: 'var(--pf-v6-global--FontWeight--bold)',
                    fontSize: 'var(--pf-v6-global--FontSize--sm)',
                    flexShrink: 0
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      margin: '0 0 var(--pf-v6-global--spacer--xs) 0',
                      fontSize: 'var(--pf-v6-global--FontSize--md)',
                      fontWeight: 'var(--pf-v6-global--FontWeight--semi-bold)',
                      color: 'var(--pf-v6-global--Color--100)'
                    }}>
                      {step.title}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: 'var(--pf-v6-global--FontSize--sm)',
                      color: 'var(--pf-v6-global--Color--200)',
                      lineHeight: 'var(--pf-v6-global--LineHeight--md)'
                    }}>
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: 'calc(-1 * var(--pf-v6-global--spacer--md))',
                    width: 'var(--pf-v6-global--spacer--md)',
                    height: '1px',
                    zIndex: 1
                  }}>
                    <div style={{
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--pf-v6-global--BorderColor--200)',
                      position: 'relative'
                    }}>
                      <div style={{
                        content: '""',
                        position: 'absolute',
                        right: '-4px',
                        top: '-3px',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid var(--pf-v6-global--BorderColor--200)',
                        borderTop: '4px solid transparent',
                        borderBottom: '4px solid transparent'
                      }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
