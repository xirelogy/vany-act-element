import {
  h,
} from 'vue';

import {
  _cast,
} from '@xirelogy/xwts';

import {
  VanyCommonActuatorHandle,
  VanyTextAreaInputRenderRequest,
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
const renderTextAreaInput = (request: VanyRenderRequest) => {
  const specRequest = request as VanyTextAreaInputRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    type: 'textarea',
    name: specRequest.name !== null ? specRequest.name : undefined,
    disabled: specRequest.disabled,
    rows: specRequest.rows ?? undefined,
    _render: specRequest._render,
  };

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
  handle.registerRenderer('text-area-input', renderTextAreaInput);
}