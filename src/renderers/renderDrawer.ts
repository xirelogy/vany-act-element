import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyDrawerRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementDrawer from '../components/ElementDrawer.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderDrawer = (request: VanyRenderRequest) => {
  const specRequest = request as VanyDrawerRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    specRequest: specRequest,
    _render: specRequest._render,
  };

  return h(ElementDrawer, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
    header: VanyRenderer.acceptOptionalSlot(specRequest.slots.header),
    footer: VanyRenderer.acceptOptionalSlot(specRequest.slots.footer),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('drawer', renderDrawer);
}