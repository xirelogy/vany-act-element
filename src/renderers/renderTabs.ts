import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyTabsRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import {
  ElTabs,
} from 'element-plus';
import 'element-plus/es/components/tabs/style/css';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderTabs = (request: VanyRenderRequest) => {
  const specRequest = request as VanyTabsRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    tabPosition: 'top',
    type: 'border-card',
  } as Record<string, any>;

  return h(ElTabs, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('tabs', renderTabs);
}