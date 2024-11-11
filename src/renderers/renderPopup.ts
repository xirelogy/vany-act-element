import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyPopupRenderRequest,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementPopover from '../components/ElementPopover.vue'


/**
 * Rendering function
 * @param request Rendering request
 */
const renderPopup = (request: VanyRenderRequest) => {
  const specRequest = request as VanyPopupRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    trigger: specRequest.trigger,
    placement: specRequest.placement,
    width: specRequest.width,
    popupClass: specRequest.popupClass,
    _render: specRequest._render,
  };

  return h(ElementPopover, attrs, specRequest.slots);
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('popup', renderPopup);
}
