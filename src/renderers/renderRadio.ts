import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyInlineState,
  VanyRadioRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import {
  ElRadio,
} from 'element-plus';
import 'element-plus/es/components/radio/style/css';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderRadio = (request: VanyRenderRequest) => {
  const specRequest = request as VanyRadioRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    value: specRequest.value,
    disabled: specRequest.disabled,
  } as Record<string, any>;

  // Expand the radio if not inline
  if (!VanyInlineState.isInline()) {
    attrs.class = (attrs.class ?? []).concat(['vany-util-width-full']);
  }

  return h(ElRadio, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('radio', renderRadio);
}