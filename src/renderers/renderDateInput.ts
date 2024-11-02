import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyDateInputRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementDatePicker from '../components/ElementDatePicker.vue';


/*
 * Rendering function
 * @param request Rendering request
 */
const renderDateInput = (request: VanyRenderRequest) => {
  const specRequest = request as VanyDateInputRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    name: specRequest.name !== null ? specRequest.name : undefined,
    disabled: specRequest.disabled,
    _render: specRequest._render,
  };

  return h(ElementDatePicker, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
}


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('date-input', renderDateInput);
}