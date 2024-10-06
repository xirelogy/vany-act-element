<script setup lang="ts">
import {
  cloneVNode,
  h,
  useAttrs,
  useSlots,
  type VNode,
} from 'vue';

import {
  type MinVNode,
  VanyRenderAttributes,
  VanyRenderer,
  VanyVue,
} from '@xirelogy/vany';

const attrs = new VanyRenderAttributes({
  ...VanyRenderer.acceptAttrs(useAttrs()),
});

const slots = useSlots();

const render = () => {
  attrs.mergeAttrsClass([
    'el-input',
    'el-input-group',
    'el-vany-input-group',
  ]);

  const slotContents = VanyVue.patchVNodes(
    VanyRenderer.acceptSlot(slots.default)(),
    (target: MinVNode) => {
      // Text node shall be wrapped in span
      if (VanyVue.isTextVNode(target)) {
        return h('span', {
          class: 'el-vany-input-group__item',
        }, [ target as VNode ]);
      }

      // Native nodes are being cloned with additional class
      if (typeof target.type === 'string' && target.type != 'input') {
        return cloneVNode(target as VNode, {
          class: 'el-vany-input-group__item',
        });
      }

      const targetCompType = VanyVue.getComponentVNodeType(target);
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
