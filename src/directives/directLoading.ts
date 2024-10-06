import {
  VanyCommonActuatorHandle,
  type VanyCompatDirective,
} from '@xirelogy/vany';

import {
  ElLoadingDirective,
} from 'element-plus';


/**
 * Directive provider
 * @returns
 */
function directLoading(): VanyCompatDirective|undefined {
  return ElLoadingDirective;
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerDirective('loading', directLoading);
}