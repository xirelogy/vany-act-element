import {
  h,
} from 'vue';

import {
  _cast,
} from '@xirelogy/xwts';

import {
  VanyCommonActuatorHandle,
  VanyCloseRenderRequest,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementClose from '../components/ElementClose.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderClose = (request: VanyRenderRequest) => {
  const specRequest = request as VanyCloseRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    _render: specRequest._render,
  };

  return h(ElementClose, attrs, {});
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('close', renderClose);
}