import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyTableRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import {
  ElTable,
} from 'element-plus';
import 'element-plus/es/components/table/style/css';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderTable = (request: VanyRenderRequest) => {
  const specRequest = request as VanyTableRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    data: specRequest.data,
    border: specRequest.bordered,
    rowKey: specRequest.rowKey,
  } as Record<string, any>;

  // Process default slot and try to extract the content for label
  return h(ElTable, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
    empty: VanyRenderer.acceptSlot(specRequest.slots.empty),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('table', renderTable);
}