<script setup lang="ts">
import {
  ref,
  useSlots,
  watch,
} from 'vue';

import {
  type VanyPopupTriggerType,
  type VanyPopupPlacementType,
  VanyPopupRenderService,
} from '@xirelogy/vany';

import {
  ElPopover,
} from 'element-plus';
import 'element-plus/es/components/popover/style/css';

const props = defineProps<{
  trigger: VanyPopupTriggerType,
  placement: VanyPopupPlacementType,
  width: string|number,
  popupClass?: string,
  _render: VanyPopupRenderService|null,
}>();

const slots = useSlots();

const isVisible = ref(false);


/**
 * Translate trigger type
 * @param trigger
 * @returns
 */
function translateTrigger(trigger: VanyPopupTriggerType) {
  switch (trigger) {
    case 'hover':
      return 'hover';
    case 'click':
      return 'click';
    case 'context':
      return 'contextmenu';
    default:
      return 'hover';
  }
}


// Connect model value
props._render?.modelValue?.onWatch((value: boolean) => {
  isVisible.value = value;
});
watch(() => isVisible.value, (value: boolean) => {
  props._render?.modelValue?.notifyUpdate(value);
});
</script>

<template>
  <ElPopover
    :placement="props.placement"
    :trigger="translateTrigger(props.trigger)"
    :width="props.width"
    :popper-class="props.popupClass"
    v-model:visible="isVisible"
  >
    <template v-if="slots.reference" #reference><slot name="reference"></slot></template>
    <slot></slot>
  </ElPopover>
</template>