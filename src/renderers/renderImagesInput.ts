import {
  h,
} from 'vue';

import {
  _cast,
} from '@xirelogy/xwts';

import {
  VanyCommonActuatorHandle,
  VanyImagesInputRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementImagesInput from '../components/ElementImagesInput.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderImagesInput = (request: VanyRenderRequest) => {
  const specRequest = request as VanyImagesInputRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    disabled: specRequest.disabled,
    specRequest: specRequest,
    _render: specRequest._render,
  };

  return h(ElementImagesInput, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('images-input', renderImagesInput);
}