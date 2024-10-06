import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyInputGroupRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementInputGroup from '../components/ElementInputGroup.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderInputGroup = (request: VanyRenderRequest) => {
  const specRequest = request as VanyInputGroupRenderRequest;
  const attrs = {
    ...specRequest.attrs,
  } as Record<string, any>;

  return h(ElementInputGroup, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('input-group', renderInputGroup);
}