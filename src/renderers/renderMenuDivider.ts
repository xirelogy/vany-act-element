import {
  h,
} from 'vue';

import {
  _used,
} from '@xirelogy/xwts';

import {
  VanyCommonActuatorHandle,
  VanyMenuDividerRenderRequest,
  VanyRenderRequest,
} from '@xirelogy/vany';

import {
  useNamespace,
} from 'element-plus/es';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderMenuDivider = (request: VanyRenderRequest) => {
  const specRequest = request as VanyMenuDividerRenderRequest;
  const type = specRequest.containerType;

  if (type === 'dropdown-menu' || type === 'menu') {
    // Menu aliased to use dropdown's separator as workaround
    const nsDropdownMenu = useNamespace('dropdown-menu');

    return h('li', {
      class: [
        nsDropdownMenu.em('item', 'divided'),
      ],
      role: 'separator',
    });
  }

  return null;
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('menu-divider', renderMenuDivider);
}