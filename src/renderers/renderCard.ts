import { _used } from '@xirelogy/xwts';

import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyCardDockValue,
  VanyCardRenderRequest,
  VanyRenderer,
  VanyRenderAttributes,
  VanyRenderRequest,
  VanyExtendedSlot,
} from '@xirelogy/vany';

import {
  ElCard,
} from 'element-plus';
import 'element-plus/es/components/card/style/css';


/**
 * Rendering function providing mock implementation of 'el-card' with dock
 * @param specRequest
 * @param dock
 */
const renderCardWithDock = (specRequest: VanyCardRenderRequest, dock: VanyCardDockValue) => {
  _used(dock);

  let children = [];

  if (specRequest.slots.header) {
    children.push(h('div', {
      class: ['el-card__header'],
    }, {
      default: VanyRenderer.acceptSlot(specRequest.slots.header),
    }));
  }

  children.push(h('div', {
    class: ['el-card__body'],
  }, {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  }));

  if (specRequest.slots.footer) {
    children.push(h('div', {
      class: ['el-card__footer'],
    }, {
      default: VanyRenderer.acceptSlot(specRequest.slots.footer),
    }));
  }

  const dockAttrs = new VanyRenderAttributes();

  switch (dock) {
    case 'top':
    case 'bottom':
      {
        dockAttrs.mergeAttrsClass([
          'vany-util-width-full',
        ]);
        if (specRequest.dockClass) dockAttrs.mergeAttrsClassSpec(specRequest.dockClass);

        const _slotContent = h(VanyExtendedSlot, dockAttrs.values, {
          default: VanyRenderer.acceptSlot(specRequest.slots.dock),
        });

        if (dock === 'top') {
          children = [_slotContent].concat(children);
        } else {
          children.push(_slotContent);
        }
      }
      break;

    case 'left':
    case 'right':
      {
        dockAttrs.mergeAttrsClass([
          'vany-std-flex-item-fixed',
        ]);
        if (specRequest.dockClass) dockAttrs.mergeAttrsClassSpec(specRequest.dockClass);

        const _slotContent = h(VanyExtendedSlot, {
          class: [
            'vany-util-width-full',
            'vany-util-height-full',
          ],
        }, {
          default: VanyRenderer.acceptSlot(specRequest.slots.dock),
        });

        // Create the new divisions
        const _dockWrapDiv = h('div', dockAttrs.values, [
          _slotContent,
        ]);
        const _mainWrapDiv = h('div', {
          class: [ 'vany-std-flex-item-spring' ],
        }, children);

        // Arrange according to left/right
        if (dock === 'left') {
          children = [
            _dockWrapDiv,
            _mainWrapDiv,
          ];
        } else {
          children = [
            _mainWrapDiv,
            _dockWrapDiv,
          ];
        }

        // Rewrap children
        children = [
          h('div', {
            class: [ 'vany-std-flex-hor' ],
          }, children),
        ];
      }
      break;
  }

  return h('div', {
    class: ['el-card', 'is-always-shadow'],
  }, children);
}


/**
 * Rendering function
 * @param request Rendering request
 */
const renderCard = (request: VanyRenderRequest) => {
  const specRequest = request as VanyCardRenderRequest;
  const attrs = {
    ...specRequest.attrs,
  } as Record<string, any>;

  const slots = {
    default: VanyRenderer.acceptSlot(specRequest.slots.default),
  } as Record<string, any>;

  if (specRequest.slots.dock) {
    return renderCardWithDock(specRequest, specRequest.dock ?? 'top');
  }

  const _dock = specRequest.dock ?? 'top';

  if (specRequest.slots.dock && _dock === 'top') {
  }

  if (specRequest.slots.header) slots.header = VanyRenderer.acceptSlot(specRequest.slots.header);
  if (specRequest.slots.footer) slots.footer = VanyRenderer.acceptSlot(specRequest.slots.footer);

  return h(ElCard, attrs, slots);
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('card', renderCard);
}
