/**
 * Overview View Component
 *
 * This component provides an introductory overview page for the Discovery tool,
 * including getting started information, process flow, upload instructions, and FAQ.
 *
 * @module overviewView
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, GridItem, PageSection, PageSectionVariants, Title, TitleSizes } from '@patternfly/react-core';
import { FAQSection } from './faqSection';
import { GettingStartedSection } from './gettingStartedSection';
import { ProgressStepperSection } from './progressStepperSection';
import { UploadSection } from './uploadSection';

const OverviewView: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <PageSection variant={PageSectionVariants.default} hasBodyWrapper={false}>
      <Title headingLevel="h1" size={TitleSizes['2xl']}>
        {t('overview.title', { default: 'Overview' })}
      </Title>

      <Grid hasGutter>
        {/* Getting Started Resource Section */}
        <GridItem span={12}>
          <GettingStartedSection />
        </GridItem>

        {/* Get Prepared Before Dive In Section */}
        <GridItem span={12}>
          <ProgressStepperSection />
        </GridItem>

        {/* Upload the Scan Report Section and FAQ Section - Side by Side */}
        <GridItem span={12} md={4}>
          <UploadSection />
        </GridItem>

        <GridItem span={12} md={8}>
          <FAQSection />
        </GridItem>
      </Grid>
    </PageSection>
  );
};

export default OverviewView;
