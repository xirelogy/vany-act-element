import {
  VanyCommonActuatorHandle,
} from '@xirelogy/vany';

import directLoading from './directLoading';


/**
 * Initialize all directives
 * @param handle
 */
export default function initDirectives(handle: VanyCommonActuatorHandle): void {
  directLoading(handle);
}