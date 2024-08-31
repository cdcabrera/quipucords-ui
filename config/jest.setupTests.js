import { act } from 'react';
import { render, renderHook } from '@testing-library/react';
import { dotenv } from 'weldable';

/**
 * Set dotenv params.
 */
dotenv.setupDotenvFilesForEnv({ env: process.env.NODE_ENV });

/**
 * Emulate i18next setup
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
 * Emulate for translation hook for snapshots
 */
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({ t: (...args) => args })
}));

/**
 * Quick React function component and hook results testing. Based off of classic Enzyme testing,
 * Use "shallowComponent" if
 * - the component is a function, class results may not be expected
 * - you want a quick component response typically determined by a condition
 * - snapshot size needs to be reduced
 * - the insanity of having a more complicated testing API than actual React components/hooks has finally gotten to you
 *
 * @param {React.ReactNode} testComponent
 * @returns {{unmount: () => void, render: () => any, getHTML: () => any, querySelector: () => any,
 *     querySelectorAll: () => any, setProps: () => Promise<any> } | any}
 */
export const shallowComponent = async testComponent => {
  const localRenderHook = async (component, updatedProps) => {
    if (typeof component?.type === 'function') {
      try {
        let result;
        let unmount;

        // const { result: reactTestingResult, rerender, unmount: reactTestingUnmount } = testingRenderHook(() =>
        const { result: reactTestingResult, unmount: reactTestingUnmount } = renderHook(() =>
          component.type({ ...component.props, ...updatedProps })
        );
        await act(async () => {
          result = await reactTestingResult;
        });

        unmount = reactTestingUnmount;

        if (!result || !result.current || typeof result.current === 'string' || typeof result.current === 'number') {
          return result.current;
        }

        if (typeof result.current === 'function') {
          return result.current.toString();
        }

        const getHTML = (sel, _internalRender = result.current) => {
          const { container } = render(_internalRender);
          return container.innerHTML;
        };

        const renderComponent = (sel = '*', _internalRender = result.current) => {
          if (!_internalRender || typeof _internalRender === 'string' || typeof _internalRender === 'number') {
            return _internalRender;
          }

          if (typeof _internalRender === 'function') {
            return _internalRender.toString();
          }

          const { container } = render(_internalRender);
          return container.querySelector(sel);
        };

        const querySelector = (sel, _internalRender = result.current) => {
          const { container } = render(_internalRender);
          return container.querySelector(sel);
        };

        const querySelectorAll = (sel, _internalRender = result.current) => {
          const { container } = render(_internalRender);
          return container.querySelectorAll(sel);
        };

        const setProps = async p => localRenderHook(component, p);

        if (Array.isArray(result.current)) {
          const updatedR = result.current;
          updatedR.unmount = unmount;
          updatedR.render = () => result.current.map(res => renderComponent(undefined, res));
          updatedR.getHTML = getHTML;
          updatedR.querySelector = querySelector;
          updatedR.querySelectorAll = querySelectorAll;
          updatedR.setProps = setProps;
          return updatedR;
        }

        return {
          ...result.current,
          unmount,
          // rerender,
          render: renderComponent,
          find: querySelector,
          getHTML,
          querySelector,
          querySelectorAll,
          setProps
        };
      } catch (e) {
        console.error(e.message);
      }
    }

    return component;
  };

  return localRenderHook(testComponent);
};

export const shallowHook = shallowComponent;
