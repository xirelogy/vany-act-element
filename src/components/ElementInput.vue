<script setup lang="ts">
import {
  ref,
  useTemplateRef,
  withDefaults,
} from 'vue';

import {
  VanyFormControlRenderService,
} from '@xirelogy/vany';

import {
  ElInput,
} from 'element-plus';
import 'element-plus/es/components/input/style/css';

const props = withDefaults(defineProps<{
  disabled: boolean,
  _render: VanyFormControlRenderService<string|null>|null,
}>(), {
  disabled: false,
  _render: null,
});

const inValue = ref('');

const refInput = useTemplateRef('input');


props._render?.modelValue?.onWatch((modelValue: string|null) => {
  inValue.value = modelValue ?? '';
});

props._render?.onFocus(async () => {
  if (!refInput.value) return false;
  await refInput.value!.focus();
  return true;
});


function onInput(value: string) {
  props._render?.modelValue?.notifyUpdate(value);
  props._render?.notifyEvent('input', arguments, value);
}

function onBlur() {
  props._render?.notifyEvent('blur', arguments);
}

function onChange() {
  props._render?.notifyEvent('change', arguments);
}
</script>

<template>
  <ElInput ref="input" v-model="inValue" :disabled="props.disabled" @input="onInput" @blur="onBlur" @change="onChange">
    <slot></slot>
  </ElInput>
</template>