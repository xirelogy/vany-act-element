import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyMenuRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementMenu from '../components/ElementMenu.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderMenu = (request: VanyRenderRequest) => {
  const specRequest = request as VanyMenuRenderRequest;

  const attrs: Record<string, any> = {
    ...specRequest.attrs,
    mode: specRequest.template,
    collapse: specRequest.compact,
    _render: specRequest._render,
  }

  return h(ElementMenu, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('menu', renderMenu);
}