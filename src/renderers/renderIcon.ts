import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyIconColorType,
  VanyIconRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
} from '@xirelogy/vany';

import { ElIcon } from 'element-plus';


/**
 * Accept icon's color type
 * @param type
 * @returns
 */
function acceptColorType(type: VanyIconColorType): string {
  switch (type) {
    case 'primary':
      return '--el-color-primary';
    case 'success':
      return '--el-color-success';
    case 'warning':
      return '--el-color-warning';
    case 'danger':
      return '--el-color-danger';
    case 'info':
      return '--el-color-info';
    case 'secondary':
      return '--el-text-color-secondary';
    default:
      return '--error';
  }
}


/**
 * Rendering function
 * @param request Rendering request
 */
const renderIcon = (request: VanyRenderRequest) => {
  const specRequest = request as VanyIconRenderRequest;

  const attrs = {
    ...specRequest.attrs,
  } as Record<string, any>;

  if (specRequest.color) attrs.color = specRequest.color;
  if (specRequest.size) attrs.size = specRequest.size;

  if (specRequest.colorType) attrs.color = `var(${acceptColorType(specRequest.colorType)})`;

  return h(ElIcon, attrs, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('icon', renderIcon);
}