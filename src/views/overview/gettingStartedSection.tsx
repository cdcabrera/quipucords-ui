/**
 * Getting Started Section Component
 *
 * Displays three informational cards about the Discovery tool, data privacy, and key process.
 *
 * @module gettingStartedSection
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Flex,
  Grid,
  GridItem,
  Title,
  TitleSizes
} from '@patternfly/react-core';
import { WrenchIcon, LockIcon, KeyIcon } from '@patternfly/react-icons';

export const GettingStartedSection: React.FunctionComponent = () => {
  const { t } = useTranslation();

  const gettingStartedItems = [
    {
      icon: <WrenchIcon />,
      title: t('overview.getting-started.about.title', { default: 'About Discovery tool' }),
      description: t('overview.getting-started.about.description', {
        default:
          'Red Hat Discovery is a tool for inspecting environments, identifying systems, OS, and configuration data to improve subscription usage reporting.'
      })
    },
    {
      icon: <LockIcon />,
      title: t('overview.getting-started.privacy.title', { default: 'Data privacy' }),
      description: t('overview.getting-started.privacy.description', {
        default:
          'Data collected stays in your environment, is only shared with Red Hat if chosen, and credentials are encrypted/decrypted at scan time using a vault password.'
      })
    },
    {
      icon: <KeyIcon />,
      title: t('overview.getting-started.process.title', { default: 'Key process' }),
      description: t('overview.getting-started.process.description', {
        default:
          'Configure credentials, add sources (hostnames/IPs), run scans to collect data and gain insights without sharing sensitive info unless chosen.'
      })
    }
  ];

  return (
    <Card style={{ overflow: 'visible' }}>
      <CardHeader>
        <CardTitle>
          <Title headingLevel="h2" size={TitleSizes.lg}>
            {t('overview.getting-started.title', { default: 'Getting started resource' })}
          </Title>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Grid hasGutter>
          {gettingStartedItems.map((item, index) => (
            <GridItem key={index} span={12} md={4}>
              <Card isPlain style={{ overflow: 'visible' }}>
                <CardHeader>
                  <Flex gap={{ default: 'gapSm' }} alignItems={{ default: 'alignItemsCenter' }}>
                    {item.icon}
                    <Title headingLevel="h3" size={TitleSizes.md}>
                      {item.title}
                    </Title>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <p>{item.description}</p>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </CardBody>
    </Card>
  );
};
