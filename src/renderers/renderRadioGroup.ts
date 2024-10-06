import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyRadioGroupRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementRadioGroup from '../components/ElementRadioGroup.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderRadioGroup = (request: VanyRenderRequest) => {
  const specRequest = request as VanyRadioGroupRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    name: specRequest.name ? specRequest.name : undefined,
    inline: specRequest.inline,
    disabled: specRequest.disabled,
    _render: specRequest._render,
  };

  return h(ElementRadioGroup, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('radio-group', renderRadioGroup);
}