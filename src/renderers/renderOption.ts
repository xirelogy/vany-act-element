import {
  h,
} from 'vue';

import {
  type Constructor,
} from '../internals/compat';

import {
  VanyCommonActuatorHandle,
  VanyOptionRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
  VanyVue,
} from '@xirelogy/vany';

import {
  ElOption,
} from 'element-plus';
import 'element-plus/es/components/option/style/css';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderOption = (request: VanyRenderRequest) => {
  const specRequest = request as VanyOptionRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    value: specRequest.value,
    disabled: specRequest.disabled,
  } as Record<string, any>;

  // Process default slot and try to extract the content for label
  const defaultSlot = VanyRenderer.acceptSlot(specRequest.slots.default);
  const defaultSlotContents = defaultSlot();

  if (defaultSlotContents !== null) {
    attrs.label = VanyVue.flattenVNodeAsText(defaultSlotContents).trim();
  }

  return h(ElOption as Constructor, attrs, {
    default: defaultSlot,
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('option', renderOption);
}