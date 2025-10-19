import {
  h,
} from 'vue';

import {
  _cast,
  xw,
} from '@xirelogy/xwts';

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
    name: specRequest.name !== null ? specRequest.name : undefined,
    placeholder: xw.normalizeString(specRequest.placeholder ?? null),
    disabled: specRequest.disabled,
    _render: specRequest._render,
  };

  delete _cast<Record<string, any>>(attrs).type;
  if (specRequest.password) _cast<Record<string, any>>(attrs).type = 'password';

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