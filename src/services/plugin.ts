import {
  VanyCommonActuatorHandle,
} from '@xirelogy/vany';

import serviceNotify from './serviceNotify';


/**
 * Initialize all services
 * @param handle
 */
export default function initServices(handle: VanyCommonActuatorHandle): void {
  serviceNotify(handle);
}