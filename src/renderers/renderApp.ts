import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyAppRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementConfigProvider from '../components/ElementConfigProvider.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderApp = (request: VanyRenderRequest) => {
  const specRequest = request as VanyAppRenderRequest;

  return h(ElementConfigProvider, {}, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('app', renderApp);
}