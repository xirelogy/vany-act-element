import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyDivRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderDiv = (request: VanyRenderRequest) => {
  const specRequest = request as VanyDivRenderRequest;

  return h('div', {}, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('div', renderDiv);
}