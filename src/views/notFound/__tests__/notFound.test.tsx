import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { shallowComponent } from '../../../../config/jest.setupTests';
import { NotFound } from '../notFound';

describe('NotFound', () => {
  it('should render a basic component', async () => {
    const component = await shallowComponent(<NotFound />);
    expect(component).toMatchSnapshot('basic');
  });
});
