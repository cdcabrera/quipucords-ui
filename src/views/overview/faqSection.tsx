/**
 * FAQ Section Component
 *
 * Displays frequently asked questions in an accordion format.
 *
 * @module faqSection
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  Title,
  TitleSizes
} from '@patternfly/react-core';
import { AngleRightIcon } from '@patternfly/react-icons';

export const FAQSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const [expandedItem, setExpandedItem] = useState<string | null>('how-store-credentials');

  const faqItems = [
    {
      id: 'data-scope',
      question: t('overview.faq.data-scope.question', { default: "What's the scope of data being collected?" }),
      answer: t('overview.faq.data-scope.answer', {
        default:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      })
    },
    {
      id: 'how-store-credentials',
      question: t('overview.faq.store-credentials.question', {
        default: 'How does Discovery deal store my credentials?'
      }),
      answer: t('overview.faq.store-credentials.answer', {
        default:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      })
    },
    {
      id: 'scan-duration',
      question: t('overview.faq.scan-duration.question', { default: 'How long will a scan run?' }),
      answer: t('overview.faq.scan-duration.answer', {
        default:
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      })
    },
    {
      id: 'upload-read-report',
      question: t('overview.faq.upload-read.question', { default: 'How can I upload and read my report?' }),
      answer: t('overview.faq.upload-read.answer', {
        default:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
      })
    }
  ];

  const toggleExpanded = (id: string) => {
    // If clicking the same item, collapse it. Otherwise, expand the new item
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <Card style={{ overflow: 'visible' }}>
      <CardHeader>
        <CardTitle>
          <Title headingLevel="h2" size={TitleSizes['2xl']}>
            {t('overview.faq.title', { default: 'Frequent Q&A' })}
          </Title>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Accordion>
          {faqItems.map(item => (
            <AccordionItem key={item.id} isExpanded={expandedItem === item.id}>
              <AccordionToggle
                id={`faq-${item.id}`}
                onClick={() => toggleExpanded(item.id)}
                aria-expanded={expandedItem === item.id}
              >
                {item.question}
              </AccordionToggle>
              <AccordionContent id={`faq-content-${item.id}`}>
                <p>{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
};
