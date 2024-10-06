import {
  xw,
} from '@xirelogy/xwts';

import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyBreadcrumbRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import {
  ElBreadcrumb,
} from 'element-plus';
import 'element-plus/es/components/breadcrumb/style/css';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderBreadcrumb = (request: VanyRenderRequest) => {
  const specRequest = request as VanyBreadcrumbRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    separator: xw.normalizeString(specRequest.separator ?? '/'),
  } as Record<string, any>;

  return h(ElBreadcrumb, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('breadcrumb', renderBreadcrumb);
}