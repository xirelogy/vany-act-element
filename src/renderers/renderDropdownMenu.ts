import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyDropdownMenuRenderRequest,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementDropdownMenu from '../components/ElementDropdownMenu.vue'


/**
 * Rendering function
 * @param request Rendering request
 */
const renderDropdownMenu = (request: VanyRenderRequest) => {
  const specRequest = request as VanyDropdownMenuRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    trigger: specRequest.trigger,
    _render: specRequest._render,
  };

  return h(ElementDropdownMenu, attrs, specRequest.slots);
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('dropdown-menu', renderDropdownMenu);
}
