import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyInputFrameRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementInputFrame from '../components/ElementInputFrame.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderInputFrame = (request: VanyRenderRequest) => {
  const specRequest = request as VanyInputFrameRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    disabled: specRequest.disabled,
    _render: specRequest._render,
  };

  return h(ElementInputFrame, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('input-frame', renderInputFrame);
}