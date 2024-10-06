import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyButtonRenderRequest,
  VanyButtonType,
  VanyInlineState,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import {
  ElButton,
} from 'element-plus';
import 'element-plus/es/components/button/style/css';


type ElButtonType = 'primary'|'success'|'warning'|'info'|'danger'|'text'|'default';


/**
 * Translate the button type
 * @param type Incoming type
 * @returns Type as per ElementUI
 */
export function translateButtonType(type: VanyButtonType|undefined): ElButtonType
{
  switch (type ?? '') {
    case 'primary':
      return 'primary';
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'danger':
      return 'danger';
    case 'info':
      return 'info';
    default:
      return 'default';
  }
}


/**
 * Rendering function
 * @param request Rendering request
 */
const renderButton = (request: VanyRenderRequest) => {
  const specRequest = request as VanyButtonRenderRequest;
  const attrs = {
    ...specRequest.attrs,
    type: translateButtonType(specRequest.type),
    plain: specRequest.light,
    disabled: specRequest.disabled,
    loading: specRequest.loading,
  } as Record<string, any>;

  // Expand the button if not inline
  if (!VanyInlineState.isInline()) {
    attrs.class = (attrs.class ?? []).concat(['vany-util-width-full']);
  }

  return h(ElButton, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('button', renderButton);
}
