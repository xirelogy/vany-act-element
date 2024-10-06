<script setup lang="ts">
import {
  VanyDropdownMenuRenderService,
  type VanyDropdownMenuTriggerType,
} from '@xirelogy/vany';

import {
  ElDropdown,
  ElDropdownMenu,
} from 'element-plus';
import 'element-plus/es/components/dropdown/style/css';


const props = withDefaults(defineProps<{
  trigger: VanyDropdownMenuTriggerType,
  _render?: VanyDropdownMenuRenderService,
}>(), {
  _render: undefined,
});


/**
 * Translate trigger type
 * @param trigger
 * @returns
 */
function translateTrigger(trigger: VanyDropdownMenuTriggerType) {
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


/**
 * Handle command (item selected)
 * @param key
 */
function onCommand(key: string) {
  props._render?.notifySelected(key);
}
</script>

<template>
  <ElDropdown :trigger="translateTrigger(props.trigger)" @command="onCommand">
    <slot name="reference"></slot>
    <template #dropdown>
      <ElDropdownMenu>
        <slot></slot>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>