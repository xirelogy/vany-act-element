import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyBreadcrumbItemRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import {
  ElBreadcrumbItem,
} from 'element-plus';
import 'element-plus/es/components/breadcrumb-item/style/css';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderBreadcrumbItem = (request: VanyRenderRequest) => {
  const specRequest = request as VanyBreadcrumbItemRenderRequest;
  const attrs = {
    ...specRequest.attrs,
  } as Record<string, any>;

  return h(ElBreadcrumbItem, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('breadcrumb-item', renderBreadcrumbItem);
}