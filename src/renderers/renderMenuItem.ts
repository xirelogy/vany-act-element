import {
  h,
  createTextVNode,
  Component,
} from 'vue';

import {
  _cast,
  xw,
} from '@xirelogy/xwts';

import {
  VanyCommonActuatorHandle,
  VanyIcon,
  VanyMenuItemRenderRequest,
  VanyRenderer,
  VanyRenderRequest,
  VanyVue,
  type VanySlotFunction,
} from '@xirelogy/vany';

import {
  ElSubMenu,
  ElMenuItem,
  ElDropdownItem,
} from 'element-plus';
import 'element-plus/es/components/sub-menu/style/css';
import 'element-plus/es/components/menu-item/style/css';


/**
 * Get icon as slot function
 * @param specRequest
 * @returns
 */
function getIconSlotFunction(specRequest: VanyMenuItemRenderRequest): VanySlotFunction {
  if (specRequest.icon) {
    const iconComp = VanyVue.acceptComponent(specRequest.icon);
    return () => h(VanyIcon, {}, {
      default: () => h(_cast<Component>(iconComp)),
    });
  }

  return VanyRenderer.acceptSlot(specRequest.slots.icon);
}


/**
 * Get label as slot function
 * @param specRequest
 * @returns
 */
function getLabelSlotFunction(specRequest: VanyMenuItemRenderRequest): VanySlotFunction {
  if (specRequest.label) {
    return () => createTextVNode(xw.normalizeString(specRequest.label) as string);
  }

  return VanyRenderer.acceptSlot(specRequest.slots.label);
}


/**
 * Create the actual default slot for ElMenuItem/ElSubMenu
 * @param specRequest
 * @returns
 */
function createActualDefaultSlot(specRequest: VanyMenuItemRenderRequest): VanySlotFunction {
  const iconSlot = getIconSlotFunction(specRequest)();
  if (iconSlot === null) return getLabelSlotFunction(specRequest);

  return () => [
    iconSlot,
    h('span', {}, [
      getLabelSlotFunction(specRequest)(),
    ]),
  ];
}


/**
 * Rendering function (as menu item of dropdown)
 * @param specRequest
 * @returns
 */
function renderAsDropdownMenuItem(specRequest: VanyMenuItemRenderRequest) {
  const iconComp = specRequest.icon ? VanyVue.acceptComponent(specRequest.icon) : undefined;

  return h(ElDropdownItem, {
    icon: _cast<Component|undefined>(iconComp),
    command: specRequest.key ?? '',
    disabled: specRequest.disabled,
  }, {
    default: getLabelSlotFunction(specRequest),
  });
}


/**
 * Rendering function
 * @param request Rendering request
 */
const renderMenuItem = (request: VanyRenderRequest) => {
  const specRequest = request as VanyMenuItemRenderRequest;

  if (specRequest.containerType === 'dropdown-menu') return renderAsDropdownMenuItem(specRequest);

  const defaultSlot = VanyRenderer.acceptSlot(specRequest.slots.default)();

  const attrs = {
    index: specRequest.key ?? '-',
    disabled: specRequest.disabled,
  };

  if (specRequest.active) {
    _cast<Record<string, any>>(attrs).class = (_cast<Record<string, any>>(attrs).class ?? []).concat(['is-active']);
  }

  if (defaultSlot !== null) {
    if (specRequest.key === undefined) {
      console.warn('Sub menu without key will cause problem');
    }
    return h(ElSubMenu, attrs, {
      title: createActualDefaultSlot(specRequest),
      default: VanyRenderer.acceptSlot(specRequest.slots.default),
    });
  } else {
    return h(ElMenuItem, attrs, {
      default: getIconSlotFunction(specRequest),
      title: getLabelSlotFunction(specRequest),
    });
  }
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('menu-item', renderMenuItem);
}