<script setup lang="ts">
import {
  computed,
  provide,
  ref,
} from 'vue';

import {
  ElTooltip,
} from 'element-plus';
import 'element-plus/es/components/tooltip/style/css';

import {
  KEY as focusTrackKey,
  createFocusTrackState,
} from '../states/focusTrackState';


// Set the combined visible state
const isFocusVisible = ref(false);
const isHoverVisible = ref(false);
const isVisible = computed(() => isFocusVisible.value || isHoverVisible.value);


// Ask the childrens to take note of the focus tracking required
provide(focusTrackKey, createFocusTrackState(
  () => {
    isFocusVisible.value = true;
  },
  () => {
    isFocusVisible.value = false;
  },
));


/**
 * When mouse entered
 */
function onEnter() {
  isHoverVisible.value = true;
}


/**
 * When mouve leaved
 */
function onLeave() {
  isHoverVisible.value = false;
}
</script>

<template>
  <ElTooltip effect="light" placement="bottom" trigger="focus" :visible="isVisible">
    <slot :onmouseenter="onEnter" :onmouseleave="onLeave"></slot>
    <template #content><slot name="content"></slot></template>
  </ElTooltip>
</template>