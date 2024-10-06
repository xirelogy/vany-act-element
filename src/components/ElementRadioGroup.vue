<script setup lang="ts">
import {
  ref,
} from 'vue';

import {
  type VanyRadioValue,
  VanyFormControlRenderService,
} from '@xirelogy/vany';

import {
  ElRadioGroup,
} from 'element-plus';
import 'element-plus/es/components/radio-group/style/css';

const props = withDefaults(defineProps<{
  _render: VanyFormControlRenderService<VanyRadioValue|null>|null,
}>(), {
  _render: null,
});

const inValue = ref<VanyRadioValue>('');

props._render?.modelValue?.onWatch((modelValue: VanyRadioValue|null) => {
  inValue.value = modelValue ?? '';
});

function onChange(value: VanyRadioValue|undefined) {
  props._render?.modelValue?.notifyUpdate(value ?? null);
  props._render?.notifyEvent('change', arguments);
}
</script>

<template>
  <ElRadioGroup v-model="inValue" @change="onChange">
    <slot></slot>
  </ElRadioGroup>
</template>