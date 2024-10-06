<script setup lang="ts">
import {
  ref,
  watch,
  withDefaults,
} from 'vue';

import {
  ElCheckbox,
} from 'element-plus';
import 'element-plus/es/components/checkbox/style/css';

const props = withDefaults(defineProps<{
  modelValue: boolean|'indeterminate'|null,
  disabled: boolean,
}>(), {
  modelValue: null,
  disabled: false,
});

const emits = defineEmits<{
  'update:modelValue': [value: boolean|'indeterminate'],
}>();

const inChecked = ref(false);
const inIndeterminate = ref(false);


function onSetValues(modelValue: boolean|'indeterminate'|null): void {
  if (modelValue === 'indeterminate') {
    inIndeterminate.value = true;
  } else {
    inIndeterminate.value = false;
    inChecked.value = (modelValue === true);
  }
}

onSetValues(props.modelValue);
watch(() => props.modelValue, onSetValues);

function onChange(v: string|number|boolean) {
  if (v === true) {
    emits('update:modelValue', true);
  } else if (v === false) {
    emits('update:modelValue', false);
  }
}
</script>

<template>
  <ElCheckbox v-model="inChecked" :indeterminate="inIndeterminate" :disabled="props.disabled" @change="onChange">
    <slot></slot>
  </ElCheckbox>
</template>