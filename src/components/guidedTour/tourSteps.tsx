import React from 'react';
import { GuidedTourStep } from './types';

export const quipucordsTourSteps: GuidedTourStep[] = [
  {
    stepId: 'welcome',
    header: <div>Welcome to Quipucords</div>,
    content: (
      <div>
        <p>This tour will guide you through the main features of Quipucords.</p>
        <p>You can pause, skip, or exit the tour at any time.</p>
      </div>
    ),
    position: 'bottom',
    popoverWidth: '400px'
  },
  {
    stepId: 'header',
    header: <div>Application Header</div>,
    content: 'Access navigation, theme switching, and user controls from here.',
    spotlightSelector: '#toolbar',
    position: 'bottom',
    popoverWidth: '350px'
  },
  {
    stepId: 'sidebar',
    header: <div>Navigation Sidebar</div>,
    content: 'Navigate between Sources, Credentials, and Scans using the sidebar.',
    spotlightSelector: '.pf-v6-c-page__sidebar',
    position: 'right',
    popoverWidth: '350px'
  },
  {
    stepId: 'sources-overview',
    header: <div>Sources Management</div>,
    content: 'Add and manage your data sources. Each source represents a system you want to scan.',
    spotlightSelector: '.sources-view',
    position: 'bottom',
    popoverWidth: '400px'
  },
  {
    stepId: 'add-source',
    header: <div>Adding Sources</div>,
    content: 'Click "Add Source" to connect new data sources to your account.',
    spotlightSelector: '#add-source-button',
    position: 'bottom-start',
    popoverWidth: '350px'
  },
  {
    stepId: 'credentials',
    header: <div>Credentials Management</div>,
    content: 'Store and manage authentication credentials securely for your sources.',
    spotlightSelector: '.credentials-view',
    position: 'bottom',
    popoverWidth: '400px'
  },
  {
    stepId: 'scans',
    header: <div>Scan Management</div>,
    content: 'Create and monitor scans of your data sources to identify security issues.',
    spotlightSelector: '.scans-view',
    position: 'bottom',
    popoverWidth: '400px'
  },
  {
    stepId: 'table-features',
    header: <div>Data Tables</div>,
    content: 'Sort, filter, and interact with your data using the table controls.',
    spotlightSelector: '.pf-v6-c-table',
    position: 'top',
    popoverWidth: '350px'
  },
  {
    stepId: 'actions',
    header: <div>Actions & Menus</div>,
    content: 'Use action buttons and menus to perform operations on your data.',
    spotlightSelector: '.pf-v6-c-table__action',
    position: 'left',
    popoverWidth: '350px'
  },
  {
    stepId: 'filters',
    header: <div>Filtering & Search</div>,
    content: 'Quickly find what you need using the search and filter tools.',
    spotlightSelector: '.filter-toolbar',
    position: 'bottom',
    popoverWidth: '350px'
  },
  {
    stepId: 'theme-switching',
    header: <div>Theme Switching</div>,
    content: 'Switch between light and dark themes using the theme toggle.',
    spotlightSelector: '#theme-toggle',
    position: 'bottom-end',
    popoverWidth: '300px'
  },
  {
    stepId: 'completion',
    header: <div>You&apos;re All Set!</div>,
    content: (
      <div>
        <p>You&apos;ve completed the tour and are ready to use Quipucords.</p>
        <p>Need help? Check the documentation or contact support.</p>
      </div>
    ),
    position: 'bottom',
    popoverWidth: '400px'
  }
];
