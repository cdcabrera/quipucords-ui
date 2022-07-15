import React from 'react';
import { Modal as PfModal, ModalContent } from '@patternfly/react-core';
import { Wizard } from '../wizard';

describe('Wizard Component', () => {
  it('should render a basic component', async () => {
    const props = {
      isOpen: true,
      steps: [
        {
          id: 1,
          name: 'Lorem',
          component: 'lorem'
        },
        {
          id: 2,
          name: 'Ipsum',
          component: 'ipsum'
        },
        {
          id: 3,
          name: 'Dolor',
          component: <React.Fragment>dolor</React.Fragment>
        }
      ]
    };

    const component = await mountHookComponent(<Wizard {...props} />);
    expect(component.find(ModalContent).render()).toMatchSnapshot('basic');
  });

  it('should allow modifying specific and custom props', async () => {
    const props = {
      isForm: true
    };

    const formComponent = await mountHookComponent(<Wizard {...props} />);
    expect(formComponent.find(PfModal)).toMatchSnapshot('isForm');

    props.isForm = false;
    props.isNavHidden = true;

    const navHiddenComponent = await mountHookComponent(<Wizard {...props} />);
    expect(navHiddenComponent.find(PfModal)).toMatchSnapshot('isNavHidden');
  });
});
