import {
  VanyCommonActuatorHandle,
} from '@xirelogy/vany';

import reactDarkMode from './reactDarkMode';


/**
 * Initialize all reactors
 * @param handle
 */
export default function initReactors(handle: VanyCommonActuatorHandle): void {
  reactDarkMode(handle);
}