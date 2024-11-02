import {
  h,
} from 'vue';

import {
  _cast,
} from '@xirelogy/xwts';

import {
  VanyCommonActuatorHandle,
  VanyCheckRenderRequest,
  VanyInlineState,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementCheck from '../components/ElementCheck.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderCheck = (request: VanyRenderRequest) => {
  const specRequest = request as VanyCheckRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    modelValue: specRequest.modelValue,
    disabled: specRequest.disabled,
  };

  // Expand the check if not inline
  if (!VanyInlineState.isInline()) {
    _cast<Record<string, any>>(attrs).class = (_cast<Record<string, any>>(attrs).class ?? []).concat(['vany-util-width-full']);
  }

  return h(ElementCheck, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('check', renderCheck);
}