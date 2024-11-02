import {
  xw,
} from '@xirelogy/xwts';

import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanySelectRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementSelect from '../components/ElementSelect.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderSelect = (request: VanyRenderRequest) => {
  const specRequest = request as VanySelectRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    name: specRequest.name !== null ? specRequest.name : undefined,
    placeholder: xw.normalizeString(specRequest.placeholder ?? null),
    disabled: specRequest.disabled,
    _render: specRequest._render,
    _renderManaged: specRequest._renderManaged,
  };

  return h(ElementSelect, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('select', renderSelect);
}