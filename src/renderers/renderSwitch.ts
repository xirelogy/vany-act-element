import {
  h,
} from 'vue';

import {
  _cast,
} from '@xirelogy/xwts';

import {
  VanyCommonActuatorHandle,
  VanySwitchRenderRequest,
  VanyInlineState,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementSwitch from '../components/ElementSwitch.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderSwitch = (request: VanyRenderRequest) => {
  const specRequest = request as VanySwitchRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    disabled: specRequest.disabled,
    _render: specRequest._render,
  };

  // Expand the check if not inline
  if (!VanyInlineState.isInline()) {
    _cast<Record<string, any>>(attrs).class = (_cast<Record<string, any>>(attrs).class ?? []).concat(['vany-util-width-full']);
  }

  return h(ElementSwitch, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('switch', renderSwitch);
}