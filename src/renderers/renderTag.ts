import {
  h,
  withModifiers,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyTagRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
  type VanyTagType,
} from '@xirelogy/vany';

import {
  ElTag,
} from 'element-plus';
import 'element-plus/es/components/tag/style/css';


type ElTagType = 'primary'|'success'|'warning'|'danger'|'info';


/**
 * Translate the element type
 * @param type
 * @returns
 */
function translateTagType(type: VanyTagType): ElTagType {
  switch (type) {
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
      return 'primary';
  }
}


/**
 * Rendering function
 * @param request Rendering request
 */
const renderTag = (request: VanyRenderRequest) => {
  const specRequest = request as VanyTagRenderRequest;

  return h(ElTag, {
    type: translateTagType(specRequest.type),
    closable: specRequest.closable,
    effect: specRequest.light ? 'light' : 'dark',
    onClick: () => { specRequest._render.notifyClick(); },
    onClose: withModifiers(() => { specRequest._render.notifyClose(); }, ['stop', 'prevent']),
    //onClose: (ev: MouseEvent) => { ev.stopPropagation(); ev.preventDefault(); specRequest._render.notifyClose(); },
  }, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  });
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('tag', renderTag);
}