<script setup lang="ts">
import {
  ref,
  withDefaults,
} from 'vue';

import {
  VanyFormControlRenderService,
  type VanyCheckValueType,
} from '@xirelogy/vany';

import {
  ElCheckbox,
} from 'element-plus';
import 'element-plus/es/components/checkbox/style/css';

const props = withDefaults(defineProps<{
  disabled: boolean,
  _render: VanyFormControlRenderService<VanyCheckValueType|null>|null,
}>(), {
  disabled: false,
  _render: null,
});

const inChecked = ref(false);
const inIndeterminate = ref(false);


props._render?.modelValue?.onWatch((modelValue: VanyCheckValueType|null) => {
  if (modelValue === 'indeterminate') {
    inIndeterminate.value = true;
  } else {
    inIndeterminate.value = false;
    inChecked.value = (modelValue === true);
  }
});


/**
 * Effective value translation
 * @param v
 * @returns
 */
function getEffectiveValue(v: string|number|boolean): boolean|undefined {
  if (v === true) {
    return true;
  } else if (v === false) {
    return false;
  }

  return undefined;
}


/**
 * Handle change
 * @param v
 */
function onChange(v: string|number|boolean) {
  const value = getEffectiveValue(v);
  if (value === undefined) return;

  props._render?.modelValue?.notifyUpdate(value);
  props._render?.notifyEvent('change', arguments, v);
}
</script>

<template>
  <ElCheckbox v-model="inChecked" :indeterminate="inIndeterminate" :disabled="props.disabled" @change="onChange">
    <slot></slot>
  </ElCheckbox>
</template>