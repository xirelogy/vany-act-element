import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyTimeInputRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementTimePicker from '../components/ElementTimePicker.vue';


/*
 * Rendering function
 * @param request Rendering request
 */
const renderTimeInput = (request: VanyRenderRequest) => {
  const specRequest = request as VanyTimeInputRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    name: specRequest.name !== null ? specRequest.name : undefined,
    disabled: specRequest.disabled,
    _render: specRequest._render,
  };

  return h(ElementTimePicker, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
}


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('time-input', renderTimeInput);
}