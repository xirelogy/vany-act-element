import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyInputRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementInput from '../components/ElementInput.vue';

import {
  registerFocusBlurIfTracked,
} from '../states/focusTrackState';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderInput = (request: VanyRenderRequest) => {
  const specRequest = request as VanyInputRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    disabled: specRequest.disabled,
    _render: specRequest._render,
  } as Record<string, any>;

  delete attrs.type;

  if (specRequest.name !== null) attrs.name = specRequest.name;
  if (specRequest.password) attrs.type = 'password';

  registerFocusBlurIfTracked(attrs);

  return h(ElementInput, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('input', renderInput);
}