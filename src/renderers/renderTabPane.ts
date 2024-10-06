import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyTabPaneRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
  VanyVue,
} from '@xirelogy/vany';

import {
  ElTabPane,
} from 'element-plus';
import 'element-plus/es/components/tab-pane/style/css';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderTabPane = (request: VanyRenderRequest) => {
  const specRequest = request as VanyTabPaneRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    name: specRequest.value,
    disabled: specRequest.disabled,
  } as Record<string, any>;

  const labelSlot = VanyVue.acceptSlotOrTextAsFunction(specRequest.slots.label, specRequest.label);

  return h(ElTabPane, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
    label: labelSlot,
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('tab-pane', renderTabPane);
}