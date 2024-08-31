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
 * Quick React function component results testing.
 * Use "shallowComponent" if
 * - the component is a function, class results may not be expected
 * - you want a quick component response typically determined by a condition
 * - snapshot size needs to be reduced
 *
 * @param {React.ReactNode} testComponent
 * @returns {{unmount: () => void, find: () => unknown, querySelector: () => any,
 *     querySelectorAll: () => any, setProps: () => Promise<any> } | any}
 */
export const shallowComponent = async testComponent => {
  const localRenderHook = async (component, updatedProps) => {
    if (typeof component?.type === 'function') {
      try {
        const { result: reactTestingResult, unmount } = renderHook(() =>
          component.type({ ...component.props, ...updatedProps })
        );

        const result = reactTestingResult.current;

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

        if (Array.isArray(result)) {
          const updatedR = result;
          updatedR.unmount = unmount;
          updatedR.find = querySelector;
          updatedR.querySelector = querySelector;
          updatedR.querySelectorAll = querySelectorAll;
          updatedR.setProps = setProps;
          return updatedR;
        }

        return {
          ...result,
          unmount,
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
