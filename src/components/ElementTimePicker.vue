<script setup lang="ts">
import {
  ref,
  useTemplateRef,
  withDefaults,
} from 'vue';

import {
  VanyFormControlRenderService,
  VanyStableTimeValue,
} from '@xirelogy/vany';

import {
  ElTimePicker,
} from 'element-plus';
import 'element-plus/es/components/time-picker/style/css';

const props = withDefaults(defineProps<{
  disabled: boolean,
  _render: VanyFormControlRenderService<VanyStableTimeValue|null>|null,
}>(), {
  disabled: false,
  _render: null,
});

const inValue = ref<VanyStableTimeValue|''>('');

const refInput = useTemplateRef('input');


props._render?.modelValue?.onWatch((modelValue: VanyStableTimeValue|null) => {
  inValue.value = modelValue ?? '';
});

props._render?.onFocus(async () => {
  if (!refInput.value) return false;
  await (refInput.value! as any).focus();
  return true;
});


function onBlur() {
  props._render?.notifyEvent('blur', arguments);
}

function onChange(value: VanyStableTimeValue) {
  props._render?.modelValue?.notifyUpdate(value);
  props._render?.notifyEvent('change', arguments);
}
</script>

<template>
  <ElTimePicker ref="input" v-model="inValue" value-format="hh:mm:ss" :disabled="props.disabled" @blur="onBlur" @change="onChange">
    <slot></slot>
  </ElTimePicker>
</template>