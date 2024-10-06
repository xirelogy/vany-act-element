import {
  VanyCommonActuatorHandle,
  VanyReactiveRequest,
  VanyDarkModeReactiveRequest,
} from '@xirelogy/vany';

/**
 * Reactor function
 * @param request
 * @returns
 */
const reactDarkMode = (request: VanyReactiveRequest): boolean => {
  const specRequest = request as VanyDarkModeReactiveRequest;
  const htmlElement = document.querySelector('html');
  if (htmlElement === null) return false;

  if (specRequest.isDark) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }
  return true;
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerReactive('dark-mode', reactDarkMode);
}