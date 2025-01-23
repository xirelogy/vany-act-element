<script setup lang="ts">
import {
  ref,
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

const slots = defineSlots<{
  /**
   * Reference slot
   */
  reference?: () => any;
  /**
   * Default slot
   */
  default: () => any;
}>();

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

// Connect events
function onShow() {
  props._render?.notifyEvent('show');
}

function onShown() {
  props._render?.notifyEvent('shown');
}

function onHide() {
  props._render?.notifyEvent('hide');
}

function onHidden() {
  props._render?.notifyEvent('hidden');
}
</script>

<template>
  <ElPopover
    :placement="props.placement"
    :trigger="translateTrigger(props.trigger)"
    :width="props.width"
    :popper-class="props.popupClass"
    v-model:visible="isVisible"
    @show="onShow"
    @after-enter="onShown"
    @hide="onHide"
    @after-leave="onHidden"
  >
    <template v-if="slots.reference" #reference><slot name="reference"></slot></template>
    <slot></slot>
  </ElPopover>
</template>