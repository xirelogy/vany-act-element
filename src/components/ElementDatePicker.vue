<script setup lang="ts">
import {
  ref,
  useTemplateRef,
  withDefaults,
} from 'vue';

import {
  VanyFormControlRenderService,
  VanyStableDateValue,
} from '@xirelogy/vany';

import {
  ElDatePicker,
} from 'element-plus';
import 'element-plus/es/components/date-picker/style/css';

const props = withDefaults(defineProps<{
  disabled: boolean,
  _render: VanyFormControlRenderService<VanyStableDateValue|null>|null,
}>(), {
  disabled: false,
  _render: null,
});

const inValue = ref<VanyStableDateValue|''>('');

const refInput = useTemplateRef('input');


props._render?.modelValue?.onWatch((modelValue: VanyStableDateValue|null) => {
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

function onChange(value: VanyStableDateValue) {
  props._render?.modelValue?.notifyUpdate(value);
  props._render?.notifyEvent('change', arguments);
}
</script>

<template>
  <ElDatePicker ref="input" v-model="inValue" value-format="YYYY-MM-DD" :disabled="props.disabled" @blur="onBlur" @change="onChange">
    <slot></slot>
  </ElDatePicker>
</template>