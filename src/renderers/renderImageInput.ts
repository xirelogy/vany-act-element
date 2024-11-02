import {
  h,
} from 'vue';

import {
  _cast,
} from '@xirelogy/xwts';

import {
  VanyCommonActuatorHandle,
  VanyImageInputRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementImageInput from '../components/ElementImageInput.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderImageInput = (request: VanyRenderRequest) => {
  const specRequest = request as VanyImageInputRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    disabled: specRequest.disabled,
    specRequest: specRequest,
    _render: specRequest._render,
  };

  return h(ElementImageInput, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('image-input', renderImageInput);
}