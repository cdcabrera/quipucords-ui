/**
 * Upload Section Component
 *
 * Displays instructions for uploading scan reports to Insights with two options.
 *
 * @module uploadSection
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  List,
  ListItem,
  Title,
  TitleSizes
} from '@patternfly/react-core';

export const UploadSection: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Card style={{ overflow: 'visible' }}>
      <CardHeader>
        <CardTitle>
          <Title headingLevel="h2" size={TitleSizes.lg}>
            {t('overview.upload.title', { default: 'Upload the scan report' })}
          </Title>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Title headingLevel="h3" size={TitleSizes.md} style={{ marginBottom: 'var(--pf-v6-global--spacer--md)' }}>
          {t('overview.upload.subtitle', { default: 'Steps of uploading the report to Insights' })}
        </Title>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--pf-v6-global--spacer--lg)' }}>
          <div>
            <Title headingLevel="h4" size={TitleSizes.md} style={{ marginBottom: 'var(--pf-v6-global--spacer--sm)' }}>
              {t('overview.upload.option1.title', { default: 'Option 1' })}
            </Title>
            <List isPlain>
              <ListItem>
                {t('overview.upload.option1.step1', { 
                  default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
                })}
              </ListItem>
              <ListItem>
                {t('overview.upload.option1.step2', { 
                  default: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' 
                })}
              </ListItem>
              <ListItem>
                {t('overview.upload.option1.step3', { 
                  default: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' 
                })}
              </ListItem>
            </List>
          </div>
          
          <div>
            <Title headingLevel="h4" size={TitleSizes.md} style={{ marginBottom: 'var(--pf-v6-global--spacer--sm)' }}>
              {t('overview.upload.option2.title', { default: 'Option 2' })}
            </Title>
            <List isPlain>
              <ListItem>
                {t('overview.upload.option2.step1', { 
                  default: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' 
                })}
              </ListItem>
              <ListItem>
                {t('overview.upload.option2.step2', { 
                  default: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.' 
                })}
              </ListItem>
            </List>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
