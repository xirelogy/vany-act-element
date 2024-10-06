<script setup lang="ts">
import {
  ref,
  useSlots,
} from 'vue';

import {
  VanyDialogRenderService,
} from '@xirelogy/vany';

import {
  ElDialog,
} from 'element-plus';
import 'element-plus/es/components/dialog/style/css';

const props = withDefaults(defineProps<{
  _render: VanyDialogRenderService|null,
}>(), {
  _render: null,
});

const slots = useSlots();

const inValue = ref(false);

props._render?.modelValue?.onWatch((value: boolean) => inValue.value = value);

function onOpen() {
  props._render?.notifyEvent('show');
}

function onOpened() {
  props._render?.modelValue?.notifyUpdate(true);
  props._render?.notifyEvent('shown');
}

function onClose() {
  props._render?.notifyEvent('hide');
}

function onClosed() {
  props._render?.modelValue?.notifyUpdate(false);
  props._render?.notifyEvent('hidden');
}
</script>

<template>
  <ElDialog v-model="inValue" @open="onOpen" @opened="onOpened" @close="onClose" @closed="onClosed">
    <template v-if="slots.header" #header><slot name="header"></slot></template>
    <slot></slot>
    <template v-if="slots.footer" #footer><slot name="footer"></slot></template>
  </ElDialog>
</template>