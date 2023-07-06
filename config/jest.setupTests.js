import React from 'react';
import { fireEvent, queries, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import * as reactRedux from 'react-redux';
import { setupDotenvFilesForEnv } from './build.dotenv';

/**
 * Set dotenv params.
 */
setupDotenvFilesForEnv({ env: process.env.NODE_ENV });

/**
 * Emulate for component checks
 */
jest.mock('i18next', () => {
  const Test = function () { // eslint-disable-line
    this.use = () => this;
    this.init = () => Promise.resolve();
    this.changeLanguage = () => Promise.resolve();
  };
  return new Test();
});

/**
 * Emulate for component checks
 */
jest.mock('lodash/debounce', () => jest.fn);

/**
 * We currently use a wrapper for useSelector, emulate for component checks
 */
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}));

/**
 * React testing for components.
 * try "shallowComponent" if results are not expected... see "shallowComponent"
 *
 * try "renderComponent" if
 * - hooks are used, and are not being passed in as mock props, and/or you want to skip writing mocks for hooks
 * - html output is required
 * - events are involved
 *
 * @param {React.ReactNode} testComponent
 * @param {object} options
 * @returns {HTMLElement}
 */
global.renderComponent = (testComponent, options = {}) => {
  const getDisplayName = reactComponent =>
    reactComponent?.displayName ||
    reactComponent?.$$typeof?.displayName ||
    reactComponent?.$$typeof?.name ||
    reactComponent?.name ||
    reactComponent?.type?.displayName ||
    reactComponent?.type?.name;

  const componentInfo = {
    displayName: getDisplayName(testComponent),
    props: {
      ...testComponent?.props,
      children: React.Children.toArray(testComponent?.props?.children).map(child => ({
        displayName: getDisplayName(child),
        props: child?.props,
        type: child?.type
      }))
    }
  };

  const containerElement = document.createElement(componentInfo?.displayName || 'element');
  try {
    containerElement.setAttribute('props', JSON.stringify(componentInfo?.props || {}, null, 2));
  } catch (e) {
    //
  }
  containerElement.props = componentInfo.props;

  const { container, ...renderRest } = render(testComponent, {
    container: containerElement,
    queries,
    ...options
  });

  const appendProps = obj => {
    Object.entries(renderRest).forEach(([key, value]) => {
      obj[key] = value; // eslint-disable-line
    });
  };

  const updatedContainer = container;
  updatedContainer.find = selector => container?.querySelector(selector);
  updatedContainer.fireEvent = fireEvent;
  updatedContainer.setProps = updatedProps => {
    const updatedComponent = { ...testComponent, props: { ...testComponent?.props, ...updatedProps } };
    let rerender = renderRest.rerender(updatedComponent);

    if (rerender === undefined) {
      rerender = global.renderComponent(updatedComponent, { queries, ...options });
    }

    if (rerender) {
      rerender.find = selector => rerender?.querySelector(selector);
      rerender.fireEvent = fireEvent;
      rerender.setProps = updatedContainer.setProps;
      appendProps(rerender);
    }

    return rerender;
  };

  appendProps(updatedContainer);

  return updatedContainer;
};

/**
 * Fire a hook, return the result.
 *
 * @param {Function} useHook
 * @param {object} options
 * @param {object} options.state An object representing a mock Redux store's state.
 * @returns {*}
 */
global.renderHook = async (useHook = Function.prototype, { state } = {}) => {
  let result;
  let spyUseSelector;
  let unmountHook;

  const Hook = () => {
    result = useHook();
    return null;
  };

  await act(async () => {
    if (state) {
      spyUseSelector = jest.spyOn(reactRedux, 'useSelector').mockImplementation(_ => _(state));
    }
    const { unmount } = await render(<Hook />);
    unmountHook = unmount;
  });

  const unmount = async () => {
    await act(async () => unmountHook());
  };

  if (state) {
    spyUseSelector.mockClear();
  }

  return { unmount, result };
};

/**
 * Quick React function component results testing. Results may not be helpful.
 * try "renderComponent" if results are not expected... see "renderComponent"
 *
 * use "shallowComponent" if
 * - the component is a function, class results may not be expected
 * - all hooks are passed in as props
 * - you want a quick component response typically determined by a condition
 * - snapshot size needs to be reduced
 *
 * @param {React.ReactNode} testComponent
 * @returns {*}
 */
global.shallowComponent = async testComponent => {
  const localRenderHook = async (component, updatedProps) => {
    if (typeof component?.type === 'function') {
      try {
        const { result } = await global.renderHook(() =>
          component.type({ ...component.type.defaultProps, ...component.props, ...updatedProps })
        );

        if (!result || typeof result === 'string' || typeof result === 'number') {
          return result;
        }

        const querySelector = (sel, _internalRender = result) => {
          const { container } = render(_internalRender);
          return container.querySelector(sel);
        };

        const querySelectorAll = (sel, _internalRender = result) => {
          const { container } = render(_internalRender);
          return container.querySelectorAll(sel);
        };

        const setProps = async p => localRenderHook(component, p);

        const renderResult = () => global.renderComponent(result);

        if (Array.isArray(result)) {
          const updatedR = result;
          updatedR.render = renderResult;
          updatedR.find = querySelector;
          updatedR.querySelector = querySelector;
          updatedR.querySelectorAll = querySelectorAll;
          updatedR.setProps = setProps;
          return updatedR;
        }

        return {
          ...result,
          render: renderResult,
          find: querySelector,
          querySelector,
          querySelectorAll,
          setProps
        };
      } catch (e) {
        //
      }
    }

    return component;
  };

  return localRenderHook(testComponent);
};

/*
 * Apply invalid prop, failed prop checks.
 * jest-prop-type-error, https://www.npmjs.com/package/jest-prop-type-error
 */
beforeAll(() => {
  const { error } = console;

  console.error = (message, ...args) => {
    if (/(Invalid prop|Failed prop type)/gi.test(message)) {
      throw new Error(message);
    }

    error.apply(console, [message, ...args]);
  };
});
