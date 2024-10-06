import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyListRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementList from '../components/ElementList.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderList = (request: VanyRenderRequest) => {
  const specRequest = request as VanyListRenderRequest;

  const attrs = {
    ...specRequest.attrs,
    listMore: specRequest.listMore ?? null,
  } as Record<string, any>;

  return h(ElementList, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
    'list-more-loading': VanyRenderer.acceptSlot(specRequest.slots['list-more-loading']),
    'list-more-end': VanyRenderer.acceptSlot(specRequest.slots['list-more-end']),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('list', renderList);
}