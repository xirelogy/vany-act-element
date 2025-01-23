<script setup lang="ts">
import {
  cloneVNode,
  h,
  useAttrs,
  type VNode,
} from 'vue';

import {
  _cast,
} from '@xirelogy/xwts';

import {
  VanyRenderAttributes,
  VanyRenderer,
  VanyVue,
} from '@xirelogy/vany';

import {
  type VNode as MinVNode,
} from '@xirelogy/vue-minimal';

const attrs = new VanyRenderAttributes({
  ...VanyRenderer.acceptAttrs(useAttrs()),
});

const slots = defineSlots<{
  /**
   * Default slot
   */
  default?: () => any;
}>();


/**
 * Try to get specific slot component via current component
 * @param target
 * @param slotName
 * @returns
 */
function getComponentVNodeViaSlot(target: MinVNode, slotName: string): MinVNode {
  const _target = _cast<VNode>(target);
  if (!_target.children) return target; // Blocked

  const _children = _target.children;
  if (typeof _children !== 'object') return target; // Blocked

  const child = _cast<Record<string, any>>(_children)[slotName];
  if (typeof child !== 'function') return target; // Blocked

  const res = child();
  if (!Array.isArray(res)) return target; // Blocked

  return res[0];
}


const render = () => {
  attrs.mergeAttrsClass([
    'el-input',
    'el-input-group',
    'el-vany-input-group',
  ]);

  const slotContents = VanyVue.patchVNodes(
    VanyRenderer.acceptSlot(slots.default)(),
    (target: MinVNode) => {
      let refTarget = target;

      // Text node shall be wrapped in span
      if (VanyVue.isTextVNode(refTarget)) {
        return h('span', {
          class: 'el-vany-input-group__item',
        }, [ target as VNode ]);
      }

      // First pass
      const firstTargetCompType = VanyVue.getComponentVNodeType(refTarget);
      switch (firstTargetCompType) {
        case 'VanyDropdownMenu':
        case 'VanyPopup':
        refTarget = getComponentVNodeViaSlot(refTarget, 'reference');
      }

      // Native nodes are being cloned with additional class
      if (typeof refTarget.type === 'string' && refTarget.type != 'input') {
        return cloneVNode(target as VNode, {
          class: 'el-vany-input-group__item',
        });
      }

      const targetCompType = VanyVue.getComponentVNodeType(refTarget);
      if (targetCompType === null) return target;

      switch (targetCompType) {
        case 'VanyButton':
        case 'VanyInput':
        case 'VanySelect':
          return target;

        default:
          return h('div', {
            class: 'el-vany-input-group__item',
          }, [
            cloneVNode(target as VNode),
          ]);
      }
    }
  ) as VNode[];

  return h('div', attrs.values, slotContents);
}
</script>

<template>
  <render />
</template>
